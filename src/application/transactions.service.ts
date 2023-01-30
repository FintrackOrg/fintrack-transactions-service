import { TransactionRepository } from "../domain/transactions.repository";
import { TransactionValue } from "../domain/transactions.value";

interface ITransactionsService {
  getAccountTransactions(userId: string): Promise<TransactionValue[]>;
  getTransactionDetails(accountId: string, transactionId: string): Promise<TransactionValue>;
}

export class TransactionsService implements ITransactionsService {
  constructor(private readonly repository: TransactionRepository) {}

  async getAccountTransactions(userId: string): Promise<TransactionValue[]> {
    return this.repository.getByAccountId(userId);
  }

  async getTransactionDetails(accountId: string, transactionId: string): Promise<TransactionValue> {
    const transaction = await this.repository.getByAccountIdAndTransactionId(accountId, transactionId);
    console.log("service transactions", transaction);
    return transaction;
  }
}
