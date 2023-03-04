import {
  CreateTransaction,
  CreateTransactionDetail,
  Category,
  PaymentMethod,
} from "@fintrack-grpc/proto/transaction/v1/transaction_pb";
import { CreateAccountTransactionRequest } from "@fintrack-grpc/proto/transaction/v1/api_pb";
import { faker } from "@faker-js/faker";

const LENGTH_DEFAULT = 5;
const MAX_DETAILS = 20;

const generateFakeCreateTransactionDetail = (): CreateTransactionDetail =>
  new CreateTransactionDetail()
    .setBrand(faker.company.name())
    .setCategory(
      faker.helpers.arrayElement([
        Category.CATEGORY_CLOTHS,
        Category.CATEGORY_FOOD,
        Category.CATEGORY_GROCERIES,
        Category.CATEGORY_HOUSE,
        Category.CATEGORY_PETS,
      ]),
    )
    .setName(faker.commerce.productName())
    .setProductId(faker.datatype.uuid())
    .setQuantity(faker.datatype.number())
    .setValue(faker.datatype.number())
    .setUnitValue(faker.datatype.number());

const generateFakeCreateTransactionDetailArray = (number = LENGTH_DEFAULT): CreateTransactionDetail[] =>
  [...Array(number).keys()].map(generateFakeCreateTransactionDetail);

export const generateCreateAccountTransactionRequest = (): CreateAccountTransactionRequest =>
  new CreateAccountTransactionRequest().setTransaction(
    new CreateTransaction()
      .setAccountId(faker.datatype.uuid())
      .setDate(faker.datatype.string())
      .setDetailsList(generateFakeCreateTransactionDetailArray(faker.datatype.number(MAX_DETAILS)))
      .setPaymentMethod(
        faker.helpers.arrayElement([
          PaymentMethod.PAYMENT_METHOD_CASH,
          PaymentMethod.PAYMENT_METHOD_CREDIT,
          PaymentMethod.PAYMENT_METHOD_DEBIT,
        ]),
      )
      .setSource(faker.company.name())
      .setUserId(faker.datatype.uuid())
      .setValue(faker.datatype.number()),
  );
