import {
  BatchWriteItemCommand,
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  TableAlreadyExistsException,
  waitUntilTableExists,
  waitUntilTableNotExists,
  WriteRequest,
  AttributeValue,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { CONFIG, EnvVarsConfig } from "@config/env-vars.config";
import { Logger } from "@config/logger.config";
import { TransactionDDB } from "@infra/models/dynamodb/transactions.model";

export class DatabaseHelper {
  private readonly ddbDocumentClient: DynamoDBDocumentClient;
  private readonly config: EnvVarsConfig;
  private readonly logger = new Logger(DatabaseHelper.name).logger;
  private readonly tableName;

  constructor() {
    this.config = new EnvVarsConfig(CONFIG);
    const ddbClient = new DynamoDBClient({
      region: this.config.get("aws")["region"],
      endpoint: this.config.get("aws")["endpoint"],
      credentials: {
        accessKeyId: this.config.get("aws")["credentials"]["accessKeyId"],
        secretAccessKey: this.config.get("aws")["credentials"]["secretAccessKey"],
      },
    });
    this.ddbDocumentClient = DynamoDBDocumentClient.from(ddbClient);
    this.tableName = this.config.get("aws")["ddb"]["tableName"];
  }

  async createTable() {
    try {
      this.logger.info(`Creating table ${this.tableName}`);
      await this.ddbDocumentClient.send(
        new CreateTableCommand({
          BillingMode: "PAY_PER_REQUEST",
          TableName: this.tableName,
          AttributeDefinitions: ["PK", "SK", "GS1PK", "GS1SK"].map((key) => ({
            AttributeName: key,
            AttributeType: "S",
          })),
          KeySchema: [
            { AttributeName: "PK", KeyType: "HASH" },
            { AttributeName: "SK", KeyType: "RANGE" },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "GSI1",
              KeySchema: [
                { AttributeName: "GS1PK", KeyType: "HASH" },
                { AttributeName: "GS1SK", KeyType: "RANGE" },
              ],
              Projection: { ProjectionType: "ALL" },
            },
          ],
        })
      );
      await waitUntilTableExists({ client: this.ddbDocumentClient, maxWaitTime: 60 }, { TableName: this.tableName });
      this.logger.info(`Table ${this.tableName} created`);
    } catch (error: any) {
      if (error instanceof TableAlreadyExistsException) {
        this.logger.info("Table already exists");
      }
    }
  }

  async deleteTable() {
    this.logger.info("Deleting table");
    await this.ddbDocumentClient.send(new DeleteTableCommand({ TableName: this.tableName }));
    await waitUntilTableNotExists({ client: this.ddbDocumentClient, maxWaitTime: 60 }, { TableName: this.tableName });
    this.logger.info("Table deleted");
  }

  async createItem(items: TransactionDDB[]) {
    await this.ddbDocumentClient.send(
      new BatchWriteItemCommand({
        RequestItems: {
          [this.tableName]: items.map<WriteRequest>((item) => ({
            PutRequest: {
              Item: Object.keys(item).reduce((obj, key) => {
                const value = item[key as keyof typeof item];
                if (typeof value === "string") {
                  return { ...obj, [key]: { S: value } };
                }
                return { ...obj, [key]: { N: String(value) } };
              }, {} as Record<string, AttributeValue>),
            },
          })),
        },
      })
    );
  }
}
