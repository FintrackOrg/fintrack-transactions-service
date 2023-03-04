import { BatchWriteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { EnvVarsConfig } from "@config/env-vars.config";
import { Logger } from "@config/logger.config";

import { TransactionRepository } from "@domain/types/transactions.repository";
import { TransactionValue } from "@domain/models/transactions.value";
import { TransactionDDBMapper } from "@infra/mappers/dynamodb/transactions.ddb.mapper";

export class DynamodbRepository implements TransactionRepository {
  private readonly ddbDocumentClient: DynamoDBDocumentClient;
  private readonly TABLE_NAME;
  private readonly logger = new Logger(DynamodbRepository.name).logger;

  //TODO: Set mapper as a dependency
  constructor(private readonly config: EnvVarsConfig) {
    const ddbClient = new DynamoDBClient({
      credentials: {
        accessKeyId: this.config.get("aws")["credentials"]["accessKeyId"],
        secretAccessKey: this.config.get("aws")["credentials"]["secretAccessKey"],
      },
      endpoint: this.config.get("aws")["endpoint"],
      region: this.config.get("aws")["region"],
    });
    this.logger.info({ config: this.config }, "using config");
    this.ddbDocumentClient = DynamoDBDocumentClient.from(ddbClient);
    this.TABLE_NAME = this.config.get("aws")["ddb"]["tableName"];
  }
  async getByAccountIdAndTransactionId(accountId: string, transactionId: string): Promise<TransactionValue> {
    try {
      const query = {
        ExpressionAttributeValues: { ":pk": `ACCOUNT#${accountId}`, ":sk": `TRANSACTION#${transactionId}` },
        KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
        TableName: this.TABLE_NAME,
      };
      this.logger.debug({ query }, "Searching transaction");
      const transactionsResult = await this.ddbDocumentClient.send(new QueryCommand(query));
      if (!transactionsResult.Items) throw new Error("Items attribute from transactions not found");
      const queryProducts = {
        ExpressionAttributeValues: { ":gs1pk": `ACCOUNT#${accountId}#TRANSACTION#${transactionId}` },
        IndexName: "GSI1",
        KeyConditionExpression: "GS1PK = :gs1pk",
        TableName: this.TABLE_NAME,
      };
      this.logger.debug({ queryProducts }, "Searching products for transaction");
      const productsResult = await this.ddbDocumentClient.send(new QueryCommand(queryProducts));
      if (!productsResult.Items) throw new Error("Items attribute from products not found");

      return TransactionDDBMapper.fromDDBToTransactionValue(transactionsResult.Items, productsResult.Items);
    } catch (error) {
      this.logger.error({ error }, "On getByAccountIdAndTransactionId");
      throw error;
    }
  }

  async getByAccountId(accountId: string): Promise<TransactionValue[]> {
    try {
      const query = {
        ExpressionAttributeValues: { ":pk": `ACCOUNT#${accountId}` },
        KeyConditionExpression: "PK = :pk",
        TableName: this.TABLE_NAME,
      };
      this.logger.debug({ query }, "Searching transactions for account");
      const result = await this.ddbDocumentClient.send(new QueryCommand(query));
      if (!result.Items) throw new Error("Items attribute not found");

      return TransactionDDBMapper.fromDDBAccountToTransactionValue(result.Items);
    } catch (error) {
      this.logger.error({ accountId, error }, "On getByAccountId");
      throw error;
    }
  }

  async createAccountTransaction(transaction: TransactionValue): Promise<TransactionValue> {
    try {
      const items = TransactionDDBMapper.fromValueToDDBWriteRequest(transaction);

      const query = new BatchWriteItemCommand({ RequestItems: { [this.TABLE_NAME]: items } });
      await this.ddbDocumentClient.send(query);
      this.logger.info(`Created ${items.length} transactions registers`);
      return transaction;
    } catch (error) {
      this.logger.error({ error, transaction }, "On creating account transaction");
      throw error;
    }
  }
}
