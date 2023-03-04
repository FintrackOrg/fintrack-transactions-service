import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { TransactionProtoMapper } from "@infra/mappers/proto/transactions.proto.mapper";
import {
  GetTransactionsByAccountRequest,
  GetTransactionsByAccountResponse,
  CreateAccountTransactionRequest,
  CreateAccountTransactionResponse,
} from "@fintrack-grpc/proto/transaction/v1/api_pb";
import { Logger } from "@config/logger.config";
import { ITransactionsService } from "@app/types/transactions.service.type";
import { ITransactionServiceServer } from "@fintrack-grpc/proto/transaction/v1/api_grpc_pb";

export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name).logger;

  constructor(private readonly transactionsService: ITransactionsService) {}

  getImplementation(): ITransactionServiceServer {
    const service = this.transactionsService;
    const logger = this.logger;
    return {
      async createAccountTransaction(
        call: ServerUnaryCall<CreateAccountTransactionRequest, CreateAccountTransactionResponse>,
        callback: sendUnaryData<CreateAccountTransactionResponse>,
      ): Promise<void> {
        try {
          const protoTransaction = call.request.getTransaction();
          if (!protoTransaction) {
            return callback(new Error("left transaction"));
          }
          const transaction = TransactionProtoMapper.toTransactionValue(protoTransaction);
          const response = await service.createAccountTransaction(transaction);
          callback(null, TransactionProtoMapper.toCreateAccountTransactionResponse(response));
        } catch (error) {
          console.log("errror", error);
          logger.error({ error }, "Unexpected error on createAccountTransaction endpoint");
          callback(new Error("Unexpected error on createAccountTransaction endpoint "));
        }
      },
      async getTransactionsByAccount(
        call: ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
        callback: sendUnaryData<GetTransactionsByAccountResponse>,
      ): Promise<void> {
        try {
          logger.debug(call.request.toObject(), `Starting getTransactionsByAccount endpoint`);
          if (!call.request.getAccountId()) {
            return callback(new Error("left account id"));
          }
          const transactionList = await service.getAccountTransactions(call.request.getAccountId());
          const response = TransactionProtoMapper.toGetTransactionsByAccountResponse(transactionList);
          callback(null, response);
        } catch (error) {
          logger.error({ error }, "Unexpected error on getTransactionsByAcccount endpoint");
          callback(new Error("Unexpected error on getTransactionsByAcccount endpoint "));
        }
      },
    };
  }
}
