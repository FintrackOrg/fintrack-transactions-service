import { TransactionValue } from "@domain/models/transactions.value";
import { ITransactionsService } from "../types/transactions.service.type";

export const INVALID_ACCOUNT_ID = "invalid_account_id";

export class TransactionServiceFake implements ITransactionsService {
  private transactions: TransactionValue[] = [];

  getAccountTransactions(accountId: string): Promise<TransactionValue[]> {
    if (accountId === INVALID_ACCOUNT_ID) {
      throw new Error();
    }
    return Promise.resolve(this.transactions);
  }
  getTransactionDetails(): Promise<TransactionValue> {
    throw new Error("Method not implemented.");
  }

  setTransactions(transactions: TransactionValue[] = []): void {
    this.transactions = transactions;
  }
}
