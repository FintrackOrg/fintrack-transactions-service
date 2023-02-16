import { credentials } from "@grpc/grpc-js";

import { TransactionServiceClient } from "@fintrack-grpc/proto/transaction/v1/api_grpc_pb";
import {
  GetTransactionsByAccountRequest,
  GetTransactionsByAccountResponse,
} from "@fintrack-grpc/proto/transaction/v1/api_pb";
import * as gRPCServer from "../server";

describe("TransactionService integration tests", () => {
  let client: TransactionServiceClient;

  beforeAll(async () => {
    await gRPCServer.start();
    client = new TransactionServiceClient("localhost:50051", credentials.createInsecure());
  });
  afterAll(() => {
    gRPCServer.shutdown();
    client.close();
  });
  describe("getTransactionsByAccount endpoint", () => {
    it("should", (done) => {
      const request = new GetTransactionsByAccountRequest().setAccountId("1");
      client.getTransactionsByAccount(request, (error, response) => {
        expect(error).toBeNull();
        expect(response).toBeInstanceOf(GetTransactionsByAccountResponse);
        const transactions = response.getTransactionsList();
        transactions.forEach((transaction) => {
          expect(transaction.getAccountId()).toBe("1");
          expect(transaction.getId()).toBeDefined();
          expect(transaction.getSource()).toBeDefined();
          expect(transaction.getDate()).toBeDefined();
          expect(transaction.getPaymentMethod()).toBeDefined();
          expect(transaction.getDetailsList()).toBeDefined();
          transaction.getDetailsList().forEach((detail) => {
            expect(detail.getId()).toBeDefined();
            expect(detail.getQuantity()).toBeDefined();
            expect(detail.getName()).toBeDefined();
            expect(detail.getCategory()).toBeDefined();
            expect(detail.getTotal()).toBeDefined();
            expect(detail.getUnitValue()).toBeDefined();
            expect(detail.getBrand()).toBeDefined();
          });
        });
        done();
      });
    });
    it("should fail when no account submited", (done) => {
      const request = new GetTransactionsByAccountRequest();
      client.getTransactionsByAccount(request, (error, response) => {
        expect(error).toBeDefined();
        done();
      });
    });
  });
});
