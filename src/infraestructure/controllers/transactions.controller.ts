import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { Logger } from "@config/logger.config";
import { TransactionProtoMapper } from "@infra/mappers/proto/transactions.proto.mapper";
import {
  GetTransactionsByAccountRequest,
  GetTransactionsByAccountResponse,
} from "@infra/models/proto/transaction/v1/api_pb";
import { ITransactionsService } from "@app/types/transactions.service.type";

export class TransactionsController {
  private readonly logger = new Logger(TransactionsController.name).logger;

  constructor(private readonly transactionsService: ITransactionsService) {}

  getImplementation() {
    const service = this.transactionsService;
    const logger = this.logger;
    return {
      async getTransactionsByAccount(
        call: ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
        callback: sendUnaryData<GetTransactionsByAccountResponse>
      ) {
        logger.debug(call.request.toObject(), `Starting getTransactionsByAccount endpoint`);
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
