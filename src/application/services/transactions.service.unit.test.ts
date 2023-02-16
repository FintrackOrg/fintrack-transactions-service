import { TransactionValue } from "@domain/models/transactions.value";
import { generateFakeTransactionArray, generateFakeTransactionValue } from "@domain/models/transactions.value.fake";
import { FakeRepository } from "@infra/repositories/fake.repository";
import { TransactionsService } from "./transactions.service";

describe("Transactions Service Unit Test", () => {
  let service: TransactionsService;
  let repository: FakeRepository;
  beforeAll(() => {
    repository = new FakeRepository();
    service = new TransactionsService(repository);
  });
  describe("getAccountTransactions", () => {
    it("should get all transactions from repository", async () => {
      const transactions = generateFakeTransactionArray();
      repository.setTransactions(transactions);
      const response = await service.getAccountTransactions("transactionId");

      expect(response).toHaveLength(transactions.length);
      transactions.forEach((t) => {
        expect(t).toBeInstanceOf(TransactionValue);
      });
    });

    it("should expect an error to be throw when the repository fails", async () => {
      await expect(service.getAccountTransactions("error")).rejects.toThrow();
    });
  });

  describe("getTransactionDetails method", () => {
    it("should get the transaction given the accountId and transactionId", async () => {
      const transaction = generateFakeTransactionValue();
      repository.setTransactions([transaction]);
      const response = await service.getTransactionDetails("accountId", "transactionId");

      expect(response).toBe(transaction);
    });

    it("should expect an error to be thrown when the repository fails", async () => {
      await expect(service.getTransactionDetails("error", "")).rejects.toThrow();
    });
  });
});
