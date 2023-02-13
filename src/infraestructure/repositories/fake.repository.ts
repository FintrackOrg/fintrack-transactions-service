import { TransactionValue } from "@domain/models/transactions.value";
import { TransactionRepository } from "@domain/types/transactions.repository";

export class FakeRepository implements TransactionRepository {
  transactions: TransactionValue[] = [];

  setTransactions(transactions: TransactionValue[]) {
    this.transactions = transactions;
  }

  getByAccountId(accountId: string): Promise<TransactionValue[]> {
    if (accountId === "error") throw new Error();
    return Promise.resolve(this.transactions);
  }
  getByAccountIdAndTransactionId(accountId: string): Promise<TransactionValue> {
    if (accountId === "error") throw new Error();
    return Promise.resolve(this.transactions[0]);
  }
}
