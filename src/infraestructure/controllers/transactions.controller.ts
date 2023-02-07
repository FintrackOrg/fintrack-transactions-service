import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { TransactionsService } from "../../application/transactions.service";
import { TransactionProtoMapper } from "../mappers/proto/transactions.proto.mapper";
import {
  GetTransactionsByAccountRequest,
  GetTransactionsByAccountResponse,
} from "../models/proto/transaction/v1/api_pb";

export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  getImplementation() {
    const service = this.transactionsService;
    return {
      async getTransactionsByAccount(
        call: ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
        callback: sendUnaryData<GetTransactionsByAccountResponse>
      ) {
        if (!call.request.getAccountId()) {
          return callback(new Error("left account id"));
        }
        const transactionList = await service.getAccountTransactions(call.request.getAccountId());
        const response = TransactionProtoMapper.toGetTransactionsByAccountResponse(transactionList);
        callback(null, response);
      },
    };
  }
}
