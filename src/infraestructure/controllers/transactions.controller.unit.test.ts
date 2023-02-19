import { TransactionServiceFake } from "@app/services/transactions.service.fake";
import { generateFakeTransactionArray } from "@domain/models/transactions.value.fake";
import { TransactionsController } from "@infra/controllers/transactions.controller";
import { TransactionProtoMapper } from "@infra/mappers/proto/transactions.proto.mapper";
import {
  GetTransactionsByAccountResponse,
  GetTransactionsByAccountRequest
} from "@fintrack-grpc/proto/transaction/v1/api_pb";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

describe("Transaction Controller Unit Tests", () => {
  let controller: ReturnType<TransactionsController["getImplementation"]>;
  let service: TransactionServiceFake;

  beforeAll(() => {
    service = new TransactionServiceFake();
    controller = new TransactionsController(service).getImplementation();
  });

  it("should return transactions as proto response", async () => {
    const transactions = generateFakeTransactionArray();
    service.setTransactions(transactions);
    const mockService = jest.spyOn(service, "getAccountTransactions");
    const mockMapper = jest.spyOn(TransactionProtoMapper, "toGetTransactionsByAccountResponse");
    const expectedAccountId = transactions[0].accountId;
    const toObjectMock = jest.fn().mockReturnValueOnce({});
    const getAccountIdMock = jest.fn().mockReturnValue(expectedAccountId);
    const call = {
      request: {
        getAccountId: getAccountIdMock,
        toObject: toObjectMock
      }
    };
    const callback = (error: unknown, response: GetTransactionsByAccountResponse): void => {
      expect(error).toBeNull();
      expect(response).toBeInstanceOf(GetTransactionsByAccountResponse);
    };

    const response = await controller.getTransactionsByAccount(
      call as unknown as ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
      callback as unknown as sendUnaryData<GetTransactionsByAccountResponse>
    );
    expect(response).toBeUndefined();
    expect(toObjectMock).toHaveBeenCalled();
    expect(getAccountIdMock).toHaveBeenCalled();
    expect(mockService).toHaveBeenCalledWith(expectedAccountId);
    const transactionsParam = mockMapper.mock.calls[0][0];
    expect(transactionsParam).toHaveLength(transactions.length);
  });

  it("should fail when account id not set", async () => {
    const toObjectMock = jest.fn().mockReturnValueOnce({});
    const getAccountIdMock = jest.fn().mockReturnValue(undefined);
    const call = {
      request: {
        getAccountId: getAccountIdMock,
        toObject: toObjectMock
      }
    };
    const callback = (error: unknown): void => {
      expect(error).toBeDefined();
    };
    await controller.getTransactionsByAccount(
      call as unknown as ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
      callback as unknown as sendUnaryData<GetTransactionsByAccountResponse>
    );
  });
});
