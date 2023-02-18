import { Categories, PaymentMethods } from "@domain/models/transactions.entity";
import { faker } from "@faker-js/faker";
import { ProductModelDDB, TransactionModelDDB } from "./transactions.model";

export const generateFakeTransactionModelDDB = (transactionId: string) => {
  const accountId = transactionId;
  const quantity = faker.datatype.number(50);
  const unitValue = faker.datatype.number();
  const productId = faker.datatype.uuid();
  const detailId = faker.datatype.uuid();
  const transactionDDB: TransactionModelDDB = {
    PK: `ACCOUNT#${accountId}`,
    SK: `TRANSACTION#${transactionId}#DETAIL#${detailId}`,
    Type: "TRANSACTION",
    Quantity: quantity,
    UnitValue: unitValue,
    Total: quantity * unitValue,
    PaymentMethod: faker.helpers.arrayElement([PaymentMethods.CASH, PaymentMethods.CREDIT, PaymentMethods.DEBIT]),
    Source: faker.company.name(),
    Date: faker.datatype.string(),
    UserId: faker.datatype.uuid(),
    GS1PK: `ACCOUNT#${accountId}#PRODUCT#${productId}`,
    GS1SK: `TRANSACTION#${transactionId}#DETAIL#${detailId}#PRODUCT#${productId}`,
  };
  return { detailId, productId, transactionDDB };
};

export const generateFakeTransactionWithProducts = () => {
  const transactionId = faker.datatype.uuid();
  const transactions = generateFakeTransactionModelDDBArray(transactionId);
  const products = transactions.map(({ detailId, productId }) =>
    generateFakeProductModelDDB(transactionId, detailId, productId)
  );
  return { transactions: transactions.map((t) => t.transactionDDB), products };
};

export const generateFakeTransactionModelDDBArray = (transactionId: string, length = 5) =>
  [...Array(length).keys()].map(() => generateFakeTransactionModelDDB(transactionId));

export const generateFakeProductModelDDB = (
  transactionId: string,
  detailId: string,
  productId: string
): ProductModelDDB => {
  const accountId = transactionId;
  return {
    PK: `ACCOUNT#${accountId}`,
    SK: `PRODUCT#${productId}#TRANSACTION#${transactionId}`,
    Type: "PRODUCT",
    Name: faker.commerce.productName(),
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
  };
};
