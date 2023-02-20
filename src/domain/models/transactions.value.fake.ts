import { faker } from "@faker-js/faker";
import { Categories, PaymentMethods, TransactionDetailEntity } from "./transactions.entity";
import { TransactionValue } from "./transactions.value";

const LENGTH_DEFAULT = 5;
const MAX_DETAILS = 20;

export const generateFakeTransactionValue = (): TransactionValue =>
  new TransactionValue({
    accountId: faker.datatype.uuid(),
    date: faker.datatype.string(),
    details: generateFakeTransactionDetailArray(faker.datatype.number(MAX_DETAILS)),
    id: faker.datatype.uuid(),
    paymentMethod: faker.helpers.arrayElement([PaymentMethods.CASH, PaymentMethods.CREDIT, PaymentMethods.DEBIT]),
    source: faker.company.name(),
    userId: faker.datatype.uuid(),
    value: faker.datatype.number(),
  });

export const generateFakeTransactionDetail = (): TransactionDetailEntity => ({
  brand: faker.company.name(),
  category: faker.helpers.arrayElement([
    Categories.CLOTHS,
    Categories.FOOD,
    Categories.GROCERIES,
    Categories.HOUSE,
    Categories.PETS,
  ]),
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  quantity: faker.datatype.number(),
  total: faker.datatype.number(),
  unitValue: faker.datatype.number(),
});

export const generateFakeTransactionArray = (number = LENGTH_DEFAULT): TransactionValue[] =>
  [...Array(number).keys()].map(generateFakeTransactionValue);
export const generateFakeTransactionDetailArray = (number = LENGTH_DEFAULT): TransactionDetailEntity[] =>
  [...Array(number).keys()].map(generateFakeTransactionDetail);
