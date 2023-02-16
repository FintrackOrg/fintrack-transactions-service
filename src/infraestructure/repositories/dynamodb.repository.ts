import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { EnvVarsConfig } from "@config/env-vars.config";
import { Logger } from "@config/logger.config";

import { TransactionRepository } from "@domain/types/transactions.repository";
import { TransactionValue } from "@domain/models/transactions.value";
import { TransactionDDBMapper } from "@infra/mappers/dynamodb/transactions.ddb.mapper";

export class DynamodbRepository implements TransactionRepository {
  private readonly ddbDocumentClient: DynamoDBDocumentClient;
  private readonly TABLE_NAME = "transactions";
  private readonly logger = new Logger(DynamodbRepository.name).logger;

  //TODO: Set mapper as a dependency
  constructor(private readonly config: EnvVarsConfig) {
    const ddbClient = new DynamoDBClient({
      region: this.config.get("aws")["region"],
      endpoint: this.config.get("aws")["endpoint"],
      credentials: {
        accessKeyId: this.config.get("aws")["credentials"]["accessKeyId"],
        secretAccessKey: this.config.get("aws")["credentials"]["secretAccessKey"],
      },
    });
    this.ddbDocumentClient = DynamoDBDocumentClient.from(ddbClient);
  }
  async getByAccountIdAndTransactionId(accountId: string, transactionId: string): Promise<TransactionValue> {
    try {
      const query = {
        TableName: this.TABLE_NAME,
        KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
        ExpressionAttributeValues: { ":pk": `ACCOUNT#${accountId}`, ":sk": `TRANSACTION#${transactionId}` },
      };
      this.logger.debug({ query }, "Searching transaction");
      const transactionsResult = await this.ddbDocumentClient.send(new QueryCommand(query));
      const queryProducts = {
        TableName: this.TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "GS1PK = :gs1pk",
        ExpressionAttributeValues: { ":gs1pk": `ACCOUNT#${accountId}#TRANSACTION#${transactionId}` },
      };
      this.logger.debug({ queryProducts }, "Searching products for transaction");
      const productsResult = await this.ddbDocumentClient.send(new QueryCommand(queryProducts));
      return TransactionDDBMapper.fromDDBToTransactionValue(transactionsResult.Items!, productsResult.Items!);
    } catch (error: any) {
      this.logger.error({ error: error.message }, "On getByAccountIdAndTransactionId");
      throw error;
    }
  }

  async getByAccountId(accountId: string): Promise<TransactionValue[]> {
    try {
      const query = {
        TableName: "transactions",
        KeyConditionExpression: "PK = :pk",
        ExpressionAttributeValues: { ":pk": `ACCOUNT#${accountId}` },
      };
      this.logger.debug({ query }, "Searching transactions for account");
      const result = await this.ddbDocumentClient.send(new QueryCommand(query));
      return TransactionDDBMapper.fromDDBAccountToTransactionValue(result.Items!);
    } catch (error: any) {
      this.logger.error({ error: error.message }, "On getByAccountId");
      throw error;
    }
  }
}
