import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import {
  PaymentMethod,
  Category,
  Transaction,
  TransactionDetail,
} from "@buf/darvand_fintrackapis.community_timostamm-protobuf-ts/transaction/v1/transaction_pb";
import {
  GetTransactionsByAccountRequest,
  GetTransactionsByAccountResponse,
} from "@buf/darvand_fintrackapis.community_timostamm-protobuf-ts/transaction/v1/api_pb";
import { TransactionsService } from "../../application/transactions.service";
import { Categories, PaymentMethods } from "../../domain/transactions.entity";
import { DynamodbRepository } from "../repositories/dynamodb.repository";

const paymentMethodToProto = (paymentMethod: PaymentMethods) =>
  ({
    [PaymentMethods.CASH]: PaymentMethod.CASH,
    [PaymentMethods.CREDIT]: PaymentMethod.CREDIT,
    [PaymentMethods.DEBIT]: PaymentMethod.DEBIT,
  }[paymentMethod]);

const categoryToProto = (category: Categories) =>
  ({
    [Categories.GROCERIES]: Category.GROCERIES,
    [Categories.FOOD]: Category.FOOD,
    [Categories.CLOTHS]: Category.CLOTHS,
    [Categories.PETS]: Category.PETS,
    [Categories.HOUSE]: Category.HOUSE,
  }[category]);

class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  getImplementation() {
    const service = this.transactionsService;
    return {
      async getTransactionsByAccount(
        call: ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
        callback: sendUnaryData<GetTransactionsByAccountResponse>
      ) {
        if (!call.request.accountId) {
          return callback(new Error("left account id"));
        }
        const transactionList = await service.getAccountTransactions(call.request.accountId);
        await service.getTransactionDetails("1", "1");
        console.log("transactionList", transactionList);
        const transactions = transactionList.map<Transaction>((transaction) => ({
          ...transaction,
          paymentMethod: paymentMethodToProto(transaction.paymentMethod),
          details: transaction.details.map<TransactionDetail>((detail) => ({
            ...detail,
            category: categoryToProto(detail.category),
            value: detail.total,
          })),
        }));
        const response: GetTransactionsByAccountResponse = { transactions };
        callback(null, response);
      },
    };
  }
}

export default new TransactionsController(new TransactionsService(new DynamodbRepository())).getImplementation();
