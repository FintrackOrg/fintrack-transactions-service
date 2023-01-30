import { TransactionValue } from "./transactions.value";

export interface TransactionRepository {
  getByAccountId(accountId: string): Promise<TransactionValue[]>;
  getByAccountIdAndTransactionId(accountId: string, transactionId: string): Promise<TransactionValue>;
  // getTransactionsByDate(date: string): Promise<TransactionValue[]>;
  // getProductsByProductId
}
