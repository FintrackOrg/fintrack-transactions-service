import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { IConfig, EnvVarsConfig } from "../../config/env-vars.config";
import { TransactionDetailEntity } from "../../domain/transactions.entity";

import { TransactionRepository } from "../../domain/transactions.repository";
import { TransactionValue } from "../../domain/transactions.value";
import { TransactionDDBMapper } from "../mappers/dynamodb/transactions.ddb.mapper";

export class DynamodbRepository implements TransactionRepository {
  private readonly ddbDocumentClient: DynamoDBDocumentClient;
  private readonly TABLE_NAME = "transactions";

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
      const transactionsResult = await this.ddbDocumentClient.send(
        new QueryCommand({
          TableName: this.TABLE_NAME,
          KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
          ExpressionAttributeValues: { ":pk": `ACCOUNT#${accountId}`, ":sk": `TRANSACTION#${transactionId}` },
        })
      );
      const productsResult = await this.ddbDocumentClient.send(
        new QueryCommand({
          TableName: this.TABLE_NAME,
          IndexName: "GSI1",
          KeyConditionExpression: "GS1PK = :gs1pk",
          ExpressionAttributeValues: { ":gs1pk": `ACCOUNT#${accountId}#TRANSACTION#${transactionId}` },
        })
      );
      return TransactionDDBMapper.fromDDBToTransactionValue(transactionsResult.Items!, productsResult.Items!);
    } catch (error: any) {
      console.error("On getByAccountIdAndTransactionId", error.message);
      throw error;
    }
  }
  getTransactionsDetails(transactionId: string): Promise<TransactionDetailEntity[]> {
    return Promise.resolve([]);
  }

  async getByAccountId(accountId: string): Promise<TransactionValue[]> {
    try {
      const result = await this.ddbDocumentClient.send(
        new QueryCommand({
          TableName: "transactions",
          KeyConditionExpression: "PK = :pk",
          ExpressionAttributeValues: { ":pk": `ACCOUNT#${accountId}` },
        })
      );
      return TransactionDDBMapper.fromDDBAccountToTransactionValue(result.Items!);
    } catch (error: any) {
      console.error("On getByAccountId", error.message);
      throw error;
    }
  }
}
