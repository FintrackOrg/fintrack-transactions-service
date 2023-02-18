import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { EnvVarsConfig, IConfig } from "@config/env-vars.config";
import { TransactionValue } from "@domain/models/transactions.value";
import { generateFakeTransactionWithProducts } from "@infra/models/dynamodb/transactions.model.fake";
import { DynamodbRepository } from "./dynamodb.repository";

const envVars: IConfig = {
  aws: {
    region: "region",
    endpoint: "endpoint",
    credentials: {
      accessKeyId: "key",
      secretAccessKey: "secret",
    },
    ddb: {
      tableName: "test",
    },
  },
};

describe("DynamoDB repository Unit Tests", () => {
  let repository: DynamodbRepository;
  let config: EnvVarsConfig;
  const sendMock = jest.fn();

  beforeAll(() => {
    jest.spyOn(DynamoDBDocumentClient, "from").mockReturnValueOnce({
      send: sendMock,
    } as any);
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
        expect(query.TableName).toBe(envVars.aws.ddb.tableName);
        expect(query.KeyConditionExpression).toBe("PK = :pk and begins_with(SK, :sk)");
        expect(query.ExpressionAttributeValues).toStrictEqual({
          ":pk": `ACCOUNT#${expectedAccountId}`,
          ":sk": `TRANSACTION#${expectTransactionId}`,
        });
        return { Items: transactions };
      });
      sendMock.mockImplementationOnce((command: QueryCommand) => {
        expect(command.input).toStrictEqual({
          TableName: envVars.aws.ddb.tableName,
          IndexName: "GSI1",
          KeyConditionExpression: "GS1PK = :gs1pk",
          ExpressionAttributeValues: { ":gs1pk": `ACCOUNT#${expectedAccountId}#TRANSACTION#${expectTransactionId}` },
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
      const { transactions, products } = generateFakeTransactionWithProducts();
      sendMock.mockImplementationOnce((command: QueryCommand) => {
        expect(command.input).toStrictEqual({
          TableName: envVars.aws.ddb.tableName,
          KeyConditionExpression: "PK = :pk",
          ExpressionAttributeValues: { ":pk": `ACCOUNT#${expectedAccountId}` },
        });
        return { Items: [...transactions, ...products] };
      });
      const response = await repository.getByAccountId(expectedAccountId);
      expect(response).toHaveLength(1);
      expect(response[0].details).toHaveLength(transactions.length);
    });

    it("should throw an error when something fails", async () => {
      sendMock.mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(repository.getByAccountId("")).rejects.toThrow();
    });
  });
});
