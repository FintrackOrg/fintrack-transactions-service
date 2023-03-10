import { TransactionValue } from "@domain/models/transactions.value";
import { generateFakeTransactionValue } from "@domain/models/transactions.value.fake";
import { generateFakeTransactionWithProducts } from "@infra/models/dynamodb/transactions.model.fake";
import { TransactionDDBMapper } from "./transactions.ddb.mapper";

describe("Transaction DynamoDB mappers Unit Test", () => {
  describe("fromDDBToTransactionValue method", () => {
    it("should merge transactions and products", () => {
      const transaction = generateFakeTransactionWithProducts();
      const response = TransactionDDBMapper.fromDDBToTransactionValue(transaction.transactions, transaction.products);
      expect(response).toBeInstanceOf(TransactionValue);
      expect(response.details).toHaveLength(transaction.transactions.length);
    });
  });

  describe("fromDDBAccountToTransactionValue method", () => {
    it("should merge transactions and products", () => {
      const transaction = generateFakeTransactionWithProducts();
      const expectedTransactionsLength = 1;
      const response = TransactionDDBMapper.fromDDBAccountToTransactionValue([
        ...transaction.transactions,
        ...transaction.products,
      ]);
      expect(response).toHaveLength(expectedTransactionsLength);
      expect(response[0]).toBeInstanceOf(TransactionValue);
      expect(response[0].details).toHaveLength(transaction.transactions.length);
    });
  });

  describe("fromValueToDDBWriteRequest method", () => {
    it("should transform transaction to dynamoDB", () => {
      const transaction = generateFakeTransactionValue();
      const response = TransactionDDBMapper.fromValueToDDBWriteRequest(transaction);

      expect(response).toHaveLength(transaction.details.length + transaction.details.length);
    });
  });
});
