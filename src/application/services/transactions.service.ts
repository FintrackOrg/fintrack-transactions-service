import { Logger } from "@config/logger.config";
import { TransactionRepository } from "@domain/types/transactions.repository";
import { TransactionValue } from "@domain/models/transactions.value";
import { ITransactionsService } from "@app/types/transactions.service.type";

export class TransactionsService implements ITransactionsService {
  private readonly logger = new Logger(TransactionsService.name).logger;

  constructor(private readonly repository: TransactionRepository) {}

  async getAccountTransactions(userId: string): Promise<TransactionValue[]> {
    try {
      this.logger.debug({ userId }, "Attempting to get transactions for account");
      const transactions = await this.repository.getByAccountId(userId);
      this.logger.debug({ transactions: transactions.length }, "Successfully get transactions");
      return transactions;
    } catch (error) {
      this.logger.error({ error }, "Unexpected error when trying to get transactions for account");
      throw error;
    }
  }

  async getTransactionDetails(accountId: string, transactionId: string): Promise<TransactionValue> {
    try {
      this.logger.debug({ accountId, transactionId }, "Attempting to get transaction");
      const transaction = await this.repository.getByAccountIdAndTransactionId(accountId, transactionId);
      this.logger.debug({ transaction }, "Sucessfully get transaction");
      return transaction;
    } catch (error) {
      this.logger.error({ error }, "Unexpected error when trying to get transaction");
      throw error;
    }
  }
}
