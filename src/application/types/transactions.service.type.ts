import { TransactionValue } from "@domain/models/transactions.value";

export interface ITransactionsService {
  getAccountTransactions(userId: string): Promise<TransactionValue[]>;
  getTransactionDetails(accountId: string, transactionId: string): Promise<TransactionValue>;
  createAccountTransaction(transaction: TransactionValue): Promise<TransactionValue>;
}
