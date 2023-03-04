import { Categories, PaymentMethods, TransactionDetailEntity } from "@domain/models/transactions.entity";
import { TransactionValue } from "@domain/models/transactions.value";
import { TransactionDetail } from "@domain/models/transaction-detail.value";
import {
  GetTransactionsByAccountResponse,
  CreateAccountTransactionResponse,
} from "@fintrack-grpc/proto/transaction/v1/api_pb";
import {
  Category,
  PaymentMethod,
  Transaction,
  TransactionDetail as TransactionDetailProto,
  CreateTransaction,
  CreateTransactionDetail,
} from "@fintrack-grpc/proto/transaction/v1/transaction_pb";

const paymentMethodToProto = {
  [PaymentMethods.UNESPECIFIED]: PaymentMethod.PAYMENT_METHOD_UNSPECIFIED,
  [PaymentMethods.CASH]: PaymentMethod.PAYMENT_METHOD_CASH,
  [PaymentMethods.CREDIT]: PaymentMethod.PAYMENT_METHOD_CREDIT,
  [PaymentMethods.DEBIT]: PaymentMethod.PAYMENT_METHOD_DEBIT,
};

const categoryToProto = {
  [Categories.UNSPECIFIED]: Category.CATEGORY_UNSPECIFIED,
  [Categories.GROCERIES]: Category.CATEGORY_GROCERIES,
  [Categories.FOOD]: Category.CATEGORY_FOOD,
  [Categories.CLOTHS]: Category.CATEGORY_CLOTHS,
  [Categories.PETS]: Category.CATEGORY_PETS,
  [Categories.HOUSE]: Category.CATEGORY_HOUSE,
};

const protoToCategory = {
  [Category.CATEGORY_UNSPECIFIED]: Categories.UNSPECIFIED,
  [Category.CATEGORY_GROCERIES]: Categories.GROCERIES,
  [Category.CATEGORY_FOOD]: Categories.FOOD,
  [Category.CATEGORY_CLOTHS]: Categories.CLOTHS,
  [Category.CATEGORY_PETS]: Categories.PETS,
  [Category.CATEGORY_HOUSE]: Categories.HOUSE,
};

const protoToPaymentMethod = {
  [PaymentMethod.PAYMENT_METHOD_UNSPECIFIED]: PaymentMethods.UNESPECIFIED,
  [PaymentMethod.PAYMENT_METHOD_CASH]: PaymentMethods.CASH,
  [PaymentMethod.PAYMENT_METHOD_CREDIT]: PaymentMethods.CREDIT,
  [PaymentMethod.PAYMENT_METHOD_DEBIT]: PaymentMethods.DEBIT,
};

export class TransactionProtoMapper {
  static toProtoTransactionDetail(detail: TransactionDetailEntity): TransactionDetailProto {
    return new TransactionDetailProto()
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
      transactions.map(TransactionProtoMapper.toProtoTransaction),
    );
  }

  static toTransactionDetail(protoDetail: CreateTransactionDetail): TransactionDetail {
    return new TransactionDetail({
      brand: protoDetail.getBrand(),
      category: protoToCategory[protoDetail.getCategory()],
      name: protoDetail.getName(),
      productId: protoDetail.getProductId(),
      quantity: protoDetail.getQuantity(),
      total: protoDetail.getValue(),
      unitValue: protoDetail.getUnitValue(),
    });
  }

  static toTransactionValue(protoTransaction: CreateTransaction): TransactionValue {
    return new TransactionValue({
      accountId: protoTransaction.getAccountId(),
      date: protoTransaction.getDate(),
      details: protoTransaction.getDetailsList().map(this.toTransactionDetail),
      paymentMethod: protoToPaymentMethod[protoTransaction.getPaymentMethod()],
      source: protoTransaction.getSource(),
      userId: protoTransaction.getUserId(),
      value: protoTransaction.getValue(),
    });
  }

  static toCreateAccountTransactionResponse(transaction: TransactionValue): CreateAccountTransactionResponse {
    return new CreateAccountTransactionResponse().setTransaction(
      TransactionProtoMapper.toProtoTransaction(transaction),
    );
  }
}
