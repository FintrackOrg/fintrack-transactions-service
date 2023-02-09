import { Categories, PaymentMethods } from "@domain/transactions.entity";
import { TransactionValue } from "@domain/transactions.value";
import { ProductModelDDB, TransactionModelDDB } from "@infra/models/dynamodb/transactions.model";

export class TransactionDDBMapper {
  static fromDDBToTransactionValue(
    transactionsResult: Record<string, any>[],
    productsResult: Record<string, any>[]
  ): TransactionValue {
    const transactionsModel = transactionsResult as TransactionModelDDB[];
    const products = productsResult as ProductModelDDB[];
    const details = transactionsModel.map<TransactionValue["details"][number]>((detail) => {
      const gs1sk = detail.GS1SK.split("#");
      const product = products.find((p) => p.SK === `PRODUCT#${gs1sk[5]}#TRANSACTION#${gs1sk[1]}`)!;
      return {
        id: detail.SK.split("#")[3],
        category: Categories.CLOTHS,
        quantity: detail.Quantity,
        total: detail.UnitValue * detail.Quantity,
        unitValue: detail.UnitValue,
        name: product.Name,
        brand: product.Brand,
      };
    });
    const value = details.reduce((accum, detail) => accum + detail.total, 0);
    return new TransactionValue({
      id: transactionsModel[0].SK.split("#")[1],
      accountId: transactionsModel[0].PK.split("#")[1],
      userId: transactionsModel[0].UserId,
      date: transactionsModel[0].Date,
      paymentMethod: PaymentMethods.CASH,
      source: transactionsModel[0].Source,
      details,
      value,
    });
  }

  static fromDDBAccountToTransactionValue(allItems: Record<string, any>[]) {
    const transactions = allItems.filter((item) => item.Type === "TRANSACTION") as TransactionModelDDB[];
    const products = allItems.filter((item) => item.Type === "PRODUCT") as ProductModelDDB[];
    const transactionIds = Array.from(
      new Set(transactions.map((transaction) => `TRANSACTION#${transaction.SK.split("#")[1]}`))
    );
    const values = transactionIds.reduce<[Record<string, any>[], Record<string, any>[]][]>((accum, transactionId) => {
      const transactionsGroupped = transactions.filter((transaction) => transaction.SK.includes(transactionId));
      const productsGroupped = products.filter((product) => product.SK.includes(transactionId));
      return [...accum, [transactionsGroupped, productsGroupped]];
    }, []);
    return values.map(([t, p]) => this.fromDDBToTransactionValue(t, p));
  }
}
