import { Categories, PaymentMethods, TransactionDetailEntity } from "@domain/models/transactions.entity";
import { TransactionValue } from "@domain/models/transactions.value";
import { GetTransactionsByAccountResponse } from "@infra/models/proto/transaction/v1/api_pb";
import {
  Category,
  PaymentMethod,
  Transaction,
  TransactionDetail,
} from "@infra/models/proto/transaction/v1/transaction_pb";

const paymentMethodToProto = {
  [PaymentMethods.CASH]: PaymentMethod.PAYMENT_METHOD_CASH,
  [PaymentMethods.CREDIT]: PaymentMethod.PAYMENT_METHOD_CREDIT,
  [PaymentMethods.DEBIT]: PaymentMethod.PAYMENT_METHOD_DEBIT,
};

const categoryToProto = {
  [Categories.GROCERIES]: Category.CATEGORY_GROCERIES,
  [Categories.FOOD]: Category.CATEGORY_FOOD,
  [Categories.CLOTHS]: Category.CATEGORY_CLOTHS,
  [Categories.PETS]: Category.CATEGORY_PETS,
  [Categories.HOUSE]: Category.CATEGORY_HOUSE,
};

export class TransactionProtoMapper {
  static toProtoTransactionDetail(detail: TransactionDetailEntity): TransactionDetail {
    return new TransactionDetail()
      .setBrand(detail.brand)
      .setId(detail.id)
      .setQuantity(detail.quantity)
      .setCategory(categoryToProto[detail.category])
      .setName(detail.name)
      .setUnitValue(detail.unitValue)
      .setTotal(detail.total);
  }

  static toProtoTransaction(transaction: TransactionValue): Transaction {
    return new Transaction()
      .setAccountId(transaction.accountId)
      .setDate(transaction.date)
      .setId(transaction.id)
      .setPaymentMethod(paymentMethodToProto[transaction.paymentMethod])
      .setSource(transaction.source)
      .setValue(transaction.value)
      .setDetailsList(transaction.details.map(TransactionProtoMapper.toProtoTransactionDetail));
  }

  static toGetTransactionsByAccountResponse(transactions: TransactionValue[]): GetTransactionsByAccountResponse {
    return new GetTransactionsByAccountResponse().setTransactionsList(
      transactions.map(TransactionProtoMapper.toProtoTransaction)
    );
  }
}
