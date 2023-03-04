import { v4 as uuid } from "uuid";
import { Categories, TransactionDetailEntity } from "./transactions.entity";

export class TransactionDetail implements TransactionDetailEntity {
  readonly id: string;
  readonly category: Categories;
  readonly quantity: number;
  readonly total: number;
  readonly unitValue: number;
  readonly name: string;
  readonly brand: string;
  readonly productId: string;

  constructor(entity: Omit<TransactionDetailEntity, "id">) {
    this.id = uuid();
    this.category = entity.category;
    this.quantity = entity.quantity;
    this.total = entity.total;
    this.unitValue = entity.unitValue;
    this.name = entity.name;
    this.brand = entity.brand;
    this.productId = entity.productId;
  }
}
