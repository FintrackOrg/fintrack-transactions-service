import { v4 as uuid } from "uuid";
import { PaymentMethods, TransactionDetailEntity, TransactionEntity } from "./transactions.entity";

export class TransactionValue implements TransactionEntity {
  readonly id: string;
  readonly source: string;
  readonly value: number;
  readonly date: string;
  readonly paymentMethod: PaymentMethods;
  readonly accountId: string;
  readonly userId: string;
  readonly details: TransactionDetailEntity[];

  constructor(transaction: TransactionEntity) {
    this.id = uuid();
    this.source = transaction.source;
    this.value = transaction.value;
    this.date = transaction.date;
    this.paymentMethod = transaction.paymentMethod;
    this.details = transaction.details;
    this.accountId = transaction.accountId;
    this.userId = transaction.userId;
  }
}
