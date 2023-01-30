import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { TransactionDetailEntity } from "../../domain/transactions.entity";

import { TransactionRepository } from "../../domain/transactions.repository";
import { TransactionValue } from "../../domain/transactions.value";
import { TransactionMapper } from "../mappers/transactions.mapper";

export class DynamodbRepository implements TransactionRepository {
  private readonly ddbDocumentClient: DynamoDBDocumentClient;
  private readonly TABLE_NAME = "transactions";

  constructor() {
    const REGION = "sa-east-1";
    const ddbClient = new DynamoDBClient({
      region: REGION,
      endpoint: "http://localhost:4566",
      credentials: {
        accessKeyId: "default_access_key",
        secretAccessKey: "default_secret_key",
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
      console.log("transactions", transactionsResult.Items);
      const productsResult = await this.ddbDocumentClient.send(
        new QueryCommand({
          TableName: this.TABLE_NAME,
          IndexName: "GSI1",
          KeyConditionExpression: "GS1PK = :gs1pk",
          ExpressionAttributeValues: { ":gs1pk": `ACCOUNT#${accountId}#TRANSACTION#${transactionId}` },
        })
      );
      console.log("products", productsResult);
      return TransactionMapper.fromDDBToTransactionValue(transactionsResult.Items!, productsResult.Items!);
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
      console.log("Query result", result.Items);
      return TransactionMapper.fromDDBAccountToTransactionValue(result.Items!);
    } catch (error: any) {
      console.error("On getByAccountId", error.message);
      throw error;
    }
  }
}
