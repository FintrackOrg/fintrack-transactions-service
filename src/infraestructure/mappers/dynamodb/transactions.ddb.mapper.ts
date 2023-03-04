import { WriteRequest } from "@aws-sdk/client-dynamodb";
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
        productId: detail.GS1PK.split("#")[3],
        quantity: detail.Quantity,
        total: detail.UnitValue * detail.Quantity,
        unitValue: detail.UnitValue,
      };
    });
    const value = details.reduce((accum, detail) => accum + detail.total, 0);
    return new TransactionValue(
      {
        accountId: transactionsModel[0].PK.split("#")[1],
        date: transactionsModel[0].Date,
        details,
        paymentMethod: PaymentMethods.CASH,
        source: transactionsModel[0].Source,
        userId: transactionsModel[0].UserId,
        value,
      },
      transactionsModel[0].SK.split("#")[1],
    );
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

  static fromValueToDDBWriteRequest(transaction: TransactionValue): WriteRequest[] {
    const transactions = transaction.details.map<WriteRequest>((detail) => ({
      PutRequest: {
        Item: {
          Date: { S: transaction.date },
          GS1PK: { S: `ACCOUNT#${transaction.accountId}#PRODUCT#${detail.productId}` },
          GS1SK: { S: `TRANSACTION#${transaction.id}#DETAIL#${detail.id}#PRODUCT#${detail.productId}` },
          PK: { S: `ACCOUNT#${transaction.accountId}` },
          PaymentMethod: { S: transaction.paymentMethod },
          Quantity: { N: `${detail.quantity}` },
          SK: { S: `TRANSACTION#${transaction.id}#DETAIL#${detail.id}` },
          Source: { S: transaction.source },
          Total: { N: `${detail.quantity * detail.unitValue}` },
          Type: { S: "TRANSACTION" },
          UnitValue: { N: `${detail.unitValue}` },
          UserId: { S: transaction.userId },
        },
      },
    }));
    const products = transaction.details.map<WriteRequest>((detail) => ({
      PutRequest: {
        Item: {
          Brand: { S: detail.brand },
          Category: { S: detail.category },
          GS1PK: { S: `ACCOUNT#${transaction.accountId}#TRANSACTION#${transaction.id}` },
          GS1SK: { S: `DETAIL#${detail.id}#PRODUCT#${detail.productId}` },
          Name: { S: detail.name },
          PK: { S: `ACCOUNT#${transaction.accountId}` },
          SK: { S: `PRODUCT#${detail.productId}#TRANSACTION#${transaction.id}` },
          Type: { S: "PRODUCT" },
        },
      },
    }));
    return [...transactions, ...products];
  }
}
