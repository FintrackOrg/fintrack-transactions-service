import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { EnvVarsConfig, IConfig } from "@config/env-vars.config";
import { TransactionValue } from "@domain/models/transactions.value";
import { generateFakeTransactionValue } from "@domain/models/transactions.value.fake";
import { generateFakeTransactionWithProducts } from "@infra/models/dynamodb/transactions.model.fake";
import { DynamodbRepository } from "./dynamodb.repository";

const envVars: IConfig = {
  aws: {
    credentials: {
      accessKeyId: "key",
      secretAccessKey: "secret",
    },
    ddb: {
      tableName: "test",
    },
    endpoint: "endpoint",
    region: "region",
  },
};

describe("DynamoDB repository Unit Tests", () => {
  let repository: DynamodbRepository;
  let config: EnvVarsConfig;
  const sendMock = jest.fn();

  beforeAll(() => {
    jest.spyOn(DynamoDBDocumentClient, "from").mockReturnValueOnce({
      send: sendMock,
    } as unknown as DynamoDBDocumentClient);
    config = new EnvVarsConfig(envVars as IConfig);
    repository = new DynamodbRepository(config);
  });
  describe("getByAccountIdAndTransactionId method", () => {
    it("should search transactions and products, then return a TransactionValue", async () => {
      const { transactions, products } = generateFakeTransactionWithProducts();
      const expectedAccountId = "account";
      const expectTransactionId = "transaction";
      sendMock.mockImplementationOnce((command: QueryCommand) => {
        const query = command.input;
        expect(query.TableName).toBe(envVars.aws.ddb?.tableName);
        expect(query.KeyConditionExpression).toBe("PK = :pk and begins_with(SK, :sk)");
        expect(query.ExpressionAttributeValues).toStrictEqual({
          ":pk": `ACCOUNT#${expectedAccountId}`,
          ":sk": `TRANSACTION#${expectTransactionId}`,
        });
        return { Items: transactions };
      });
      sendMock.mockImplementationOnce((command: QueryCommand) => {
        expect(command.input).toStrictEqual({
          ExpressionAttributeValues: { ":gs1pk": `ACCOUNT#${expectedAccountId}#TRANSACTION#${expectTransactionId}` },
          IndexName: "GSI1",
          KeyConditionExpression: "GS1PK = :gs1pk",
          TableName: envVars.aws.ddb?.tableName,
        });
        return { Items: products };
      });
      const response = await repository.getByAccountIdAndTransactionId(expectedAccountId, expectTransactionId);
      expect(response).toBeInstanceOf(TransactionValue);
      expect(response.details).toHaveLength(transactions.length);
    });

    it("should throw an error when something fails", async () => {
      sendMock.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(repository.getByAccountIdAndTransactionId("", "")).rejects.toThrow();
    });
  });

  describe("getByAccountId method", () => {
    it("should search by given account id and return all transactions related", async () => {
      const expectedAccountId = "account";
      const expectedTransactionsLength = 1;
      const { transactions, products } = generateFakeTransactionWithProducts();
      sendMock.mockImplementationOnce((command: QueryCommand) => {
        expect(command.input).toStrictEqual({
          ExpressionAttributeValues: { ":pk": `ACCOUNT#${expectedAccountId}` },
          KeyConditionExpression: "PK = :pk",
          TableName: envVars.aws.ddb?.tableName,
        });
        return { Items: [...transactions, ...products] };
      });
      const response = await repository.getByAccountId(expectedAccountId);
      expect(response).toHaveLength(expectedTransactionsLength);
      expect(response[0].details).toHaveLength(transactions.length);
    });

    it("should throw an error when something fails", async () => {
      sendMock.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(repository.getByAccountId("")).rejects.toThrow();
    });
  });

  describe("createAccountTransaction method", () => {
    it("should create transaction value", async () => {
      const transaction = generateFakeTransactionValue();
      sendMock.mockImplementationOnce((command: QueryCommand) => {
        expect(command.input).toBeDefined();
      });
      const response = await repository.createAccountTransaction(transaction);
      expect(response).toBeInstanceOf(TransactionValue);
    });
  });
});
