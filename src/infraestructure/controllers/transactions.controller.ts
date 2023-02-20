import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { TransactionProtoMapper } from "@infra/mappers/proto/transactions.proto.mapper";
import {
  GetTransactionsByAccountRequest,
  GetTransactionsByAccountResponse,
} from "@fintrack-grpc/proto/transaction/v1/api_pb";
import { Logger } from "@config/logger.config";
import { ITransactionsService } from "@app/types/transactions.service.type";
import { GRPCServer } from "@fintrack-grpc/proto/transaction/v1/api_grpc_pb";

export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name).logger;

  constructor(private readonly transactionsService: ITransactionsService) {}

  getImplementation(): GRPCServer {
    const service = this.transactionsService;
    const logger = this.logger;
    return {
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
