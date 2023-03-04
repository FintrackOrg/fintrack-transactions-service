import { v4 as uuid } from "uuid";
import { TransactionDetail } from "./transaction-detail.value";
import { PaymentMethods, TransactionEntity } from "./transactions.entity";

export class TransactionValue implements TransactionEntity {
  readonly id: string;
  readonly source: string;
  readonly value: number;
  readonly date: string;
  readonly paymentMethod: PaymentMethods;
  readonly accountId: string;
  readonly userId: string;
  readonly details: TransactionDetail[];

  constructor(transaction: Omit<TransactionEntity, "id">, id?: TransactionEntity["id"]) {
    this.id = id || uuid();
    this.source = transaction.source;
    this.value = transaction.value;
    this.date = transaction.date;
    this.paymentMethod = transaction.paymentMethod;
    this.details = transaction.details.map((detail) => new TransactionDetail(detail));
    this.accountId = transaction.accountId;
    this.userId = transaction.userId;
  }
}
