import { TransactionServiceFake } from "@app/services/transactions.service.fake";
import { generateFakeTransactionArray } from "@domain/models/transactions.value.fake";
import { TransactionsController } from "@infra/controllers/transactions.controller";
import { TransactionProtoMapper } from "@infra/mappers/proto/transactions.proto.mapper";
import {
  GetTransactionsByAccountResponse,
  GetTransactionsByAccountRequest,
  CreateAccountTransactionRequest,
  CreateAccountTransactionResponse,
} from "@fintrack-grpc/proto/transaction/v1/api_pb";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { generateCreateAccountTransactionRequest } from "@infra/models/proto/transaction.proto.fake";

describe("Transaction Controller Unit Tests", () => {
  let controller: ReturnType<TransactionsController["getImplementation"]>;
  let service: TransactionServiceFake;

  beforeAll(() => {
    service = new TransactionServiceFake();
    controller = new TransactionsController(service).getImplementation();
  });

  describe("getTransactionsByAccount method", () => {
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
          toObject: toObjectMock,
        },
      };
      const callback = (error: unknown, response: GetTransactionsByAccountResponse): void => {
        expect(error).toBeNull();
        expect(response).toBeInstanceOf(GetTransactionsByAccountResponse);
      };

      const response = await controller.getTransactionsByAccount(
        call as unknown as ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
        callback as unknown as sendUnaryData<GetTransactionsByAccountResponse>,
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
          toObject: toObjectMock,
        },
      };
      const callback = (error: unknown): void => {
        expect(error).toBeDefined();
      };
      await controller.getTransactionsByAccount(
        call as unknown as ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
        callback as unknown as sendUnaryData<GetTransactionsByAccountResponse>,
      );
    });

    it("should callback error when error throwed", async () => {
      const toObjectMock = jest.fn().mockImplementationOnce(() => {
        throw new Error();
      });
      const getAccountIdMock = jest.fn().mockReturnValue(undefined);
      const call = {
        request: {
          getAccountId: getAccountIdMock,
          toObject: toObjectMock,
        },
      };
      const callback = (error: unknown): void => {
        expect(error).toBeDefined();
      };
      await controller.getTransactionsByAccount(
        call as unknown as ServerUnaryCall<GetTransactionsByAccountRequest, GetTransactionsByAccountResponse>,
        callback as unknown as sendUnaryData<GetTransactionsByAccountResponse>,
      );
    });
  });

  describe("createAccountTransaction method", () => {
    it("should create an account transaction", async () => {
      const protoTransaction = generateCreateAccountTransactionRequest().getTransaction();
      const getTransactionMock = jest.fn().mockReturnValueOnce(protoTransaction);
      const mockService = jest.spyOn(service, "createAccountTransaction");
      const mockMapper = jest.spyOn(TransactionProtoMapper, "toTransactionValue");
      const mockMapperResponse = jest.spyOn(TransactionProtoMapper, "toCreateAccountTransactionResponse");
      const call = {
        request: {
          getTransaction: getTransactionMock,
        },
      };
      const callback = (error: unknown, response: CreateAccountTransactionResponse): void => {
        expect(error).toBeNull();
        expect(response).toBeInstanceOf(CreateAccountTransactionResponse);
      };
      const response = await controller.createAccountTransaction(
        call as unknown as ServerUnaryCall<CreateAccountTransactionRequest, CreateAccountTransactionResponse>,
        callback as unknown as sendUnaryData<CreateAccountTransactionResponse>,
      );
      expect(response).toBeUndefined();
      expect(mockService).toHaveBeenCalled();
      expect(mockMapper).toHaveBeenCalledWith(protoTransaction);
      expect(mockMapperResponse).toHaveBeenCalled();
    });
    it("should fail when transaction is not set", async () => {
      const getTransactionMock = jest.fn().mockReturnValueOnce(undefined);
      const call = {
        request: {
          getTransaction: getTransactionMock,
        },
      };
      const callback = (error: unknown): void => {
        expect(error).toBeDefined();
      };
      await controller.createAccountTransaction(
        call as unknown as ServerUnaryCall<CreateAccountTransactionRequest, CreateAccountTransactionResponse>,
        callback as unknown as sendUnaryData<CreateAccountTransactionResponse>,
      );
    });
    it("should return callback error", async () => {
      const getTransactionMock = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      const call = {
        request: {
          getTransaction: getTransactionMock,
        },
      };
      const callback = (error: unknown): void => {
        expect(error).toBeDefined();
      };
      await controller.createAccountTransaction(
        call as unknown as ServerUnaryCall<CreateAccountTransactionRequest, CreateAccountTransactionResponse>,
        callback as unknown as sendUnaryData<CreateAccountTransactionResponse>,
      );
    });
  });
});
