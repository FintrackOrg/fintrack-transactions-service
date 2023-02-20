import { Categories, PaymentMethods } from "@domain/models/transactions.entity";
import { TransactionValue } from "@domain/models/transactions.value";
import { ProductModelDDB, TransactionModelDDB } from "@infra/models/dynamodb/transactions.model";

export class TransactionDDBMapper {
  static fromDDBToTransactionValue(
    transactionsResult: Record<string, unknown>[],
    productsResult: Record<string, unknown>[],
  ): TransactionValue {
    const transactionsModel = transactionsResult as TransactionModelDDB[];
    const products = productsResult as ProductModelDDB[];
    const details = transactionsModel.map<TransactionValue["details"][number]>((detail) => {
      const gs1sk = detail.GS1SK.split("#");
      const product = products.find((p) => p.SK === `PRODUCT#${gs1sk[5]}#TRANSACTION#${gs1sk[1]}`);
      if (!product) throw new Error(`Product not found in GS1SK [${detail.GS1SK}]`);
      return {
        brand: product.Brand,
        category: Categories.CLOTHS,
        id: detail.SK.split("#")[3],
        name: product.Name,
        quantity: detail.Quantity,
        total: detail.UnitValue * detail.Quantity,
        unitValue: detail.UnitValue,
      };
    });
    const value = details.reduce((accum, detail) => accum + detail.total, 0);
    return new TransactionValue({
      accountId: transactionsModel[0].PK.split("#")[1],
      date: transactionsModel[0].Date,
      details,
      id: transactionsModel[0].SK.split("#")[1],
      paymentMethod: PaymentMethods.CASH,
      source: transactionsModel[0].Source,
      userId: transactionsModel[0].UserId,
      value,
    });
  }

  static fromDDBAccountToTransactionValue(allItems: Record<string, unknown>[]): TransactionValue[] {
    const transactions = allItems.filter((item) => item.Type === "TRANSACTION") as TransactionModelDDB[];
    const products = allItems.filter((item) => item.Type === "PRODUCT") as ProductModelDDB[];
    const transactionIds = Array.from(
      new Set(transactions.map((transaction) => `TRANSACTION#${transaction.SK.split("#")[1]}`)),
    );
    const values = transactionIds.reduce<[Record<string, unknown>[], Record<string, unknown>[]][]>(
      (accum, transactionId) => {
        const transactionsGroupped = transactions.filter((transaction) => transaction.SK.includes(transactionId));
        const productsGroupped = products.filter((product) => product.SK.includes(transactionId));
        return [...accum, [transactionsGroupped, productsGroupped]];
      },
      [],
    );
    return values.map(([t, p]) => this.fromDDBToTransactionValue(t, p));
  }
}
