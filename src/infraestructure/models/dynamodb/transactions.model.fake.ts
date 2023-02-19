import { Categories, PaymentMethods } from "@domain/models/transactions.entity";
import { faker } from "@faker-js/faker";
import { ProductModelDDB, TransactionModelDDB } from "./transactions.model";

type FakeTransactionData = { detailId: string; productId: string; transactionDDB: TransactionModelDDB };

const MAX_QUANTITY = 50;
const LENGTH_DEFAULT = 5;

export const generateFakeTransactionModelDDB = (transactionId: string): FakeTransactionData => {
  const accountId = transactionId;
  const quantity = faker.datatype.number(MAX_QUANTITY);
  const unitValue = faker.datatype.number();
  const productId = faker.datatype.uuid();
  const detailId = faker.datatype.uuid();
  const transactionDDB: TransactionModelDDB = {
    Date: faker.datatype.string(),
    GS1PK: `ACCOUNT#${accountId}#PRODUCT#${productId}`,
    GS1SK: `TRANSACTION#${transactionId}#DETAIL#${detailId}#PRODUCT#${productId}`,
    PK: `ACCOUNT#${accountId}`,
    PaymentMethod: faker.helpers.arrayElement([PaymentMethods.CASH, PaymentMethods.CREDIT, PaymentMethods.DEBIT]),
    Quantity: quantity,
    SK: `TRANSACTION#${transactionId}#DETAIL#${detailId}`,
    Source: faker.company.name(),
    Total: quantity * unitValue,
    Type: "TRANSACTION",
    UnitValue: unitValue,
    UserId: faker.datatype.uuid(),
  };
  return { detailId, productId, transactionDDB };
};

export const generateFakeTransactionModelDDBArray = (
  transactionId: string,
  length = LENGTH_DEFAULT,
): FakeTransactionData[] => [...Array(length).keys()].map(() => generateFakeTransactionModelDDB(transactionId));

export const generateFakeTransactionWithProducts = (): {
  transactions: TransactionModelDDB[];
  products: ProductModelDDB[];
} => {
  const transactionId = faker.datatype.uuid();
  const transactions = generateFakeTransactionModelDDBArray(transactionId);
  const products = transactions.map(({ detailId, productId }) =>
    generateFakeProductModelDDB(transactionId, detailId, productId),
  );
  return {
    products,
    transactions: transactions.map((t) => t.transactionDDB),
  };
};

export const generateFakeProductModelDDB = (
  transactionId: string,
  detailId: string,
  productId: string,
): ProductModelDDB => {
  const accountId = transactionId;
  return {
    Brand: faker.company.name(),
    Category: faker.helpers.arrayElement([
      Categories.CLOTHS,
      Categories.FOOD,
      Categories.GROCERIES,
      Categories.HOUSE,
      Categories.PETS,
    ]),
    GS1PK: `ACCOUNT#${accountId}#TRANSACTION#${transactionId}`,
    GS1SK: `DETAIL#${detailId}#PRODUCT#${productId}`,
    Name: faker.commerce.productName(),
    PK: `ACCOUNT#${accountId}`,
    SK: `PRODUCT#${productId}#TRANSACTION#${transactionId}`,
    Type: "PRODUCT",
  };
};
