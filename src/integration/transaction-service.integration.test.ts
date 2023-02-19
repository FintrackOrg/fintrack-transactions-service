import { credentials } from "@grpc/grpc-js";

import { TransactionServiceClient } from "@fintrack-grpc/proto/transaction/v1/api_grpc_pb";
import {
  GetTransactionsByAccountRequest,
  GetTransactionsByAccountResponse
} from "@fintrack-grpc/proto/transaction/v1/api_pb";
import * as gRPCServer from "../server";
import { DatabaseHelper } from "./helpers/database.helper";
import { generateFakeTransactionWithProducts } from "@infra/models/dynamodb/transactions.model.fake";

describe("TransactionService integration tests", () => {
  let client: TransactionServiceClient;
  let dbHelper: DatabaseHelper;

  beforeAll(async () => {
    dbHelper = new DatabaseHelper();
    await gRPCServer.start();
    client = new TransactionServiceClient("localhost:50051", credentials.createInsecure());
  });

  beforeEach(() => dbHelper.createTable());

  afterEach(async () => {
    await dbHelper.deleteTable();
  });
  afterAll(() => {
    gRPCServer.shutdown();
    client.close();
  });
  describe("getTransactionsByAccount endpoint", () => {
    it("should return empty transactions", (done) => {
      try {
        const request = new GetTransactionsByAccountRequest().setAccountId("1");
        client.getTransactionsByAccount(request, (error, response) => {
          expect(error).toBeNull();
          expect(response).toBeInstanceOf(GetTransactionsByAccountResponse);
          const transactions = response.getTransactionsList();
          expect(transactions).toHaveLength(0);
          done();
        });
      } catch (error) {
        done(error);
      }
    });

    it("should return transactions", (done) => {
      try {
        const { transactions, products } = generateFakeTransactionWithProducts();
        const expectedAccountId = transactions[0].PK.split("#")[1];
        const expectedTransactions = 1;
        const request = new GetTransactionsByAccountRequest().setAccountId(expectedAccountId);
        dbHelper
          .createItem([...transactions, ...products])
          .then(() => {
            client.getTransactionsByAccount(request, (error, response) => {
              expect(error).toBeNull();
              expect(response).toBeInstanceOf(GetTransactionsByAccountResponse);
              const transactionsResponse = response.getTransactionsList();
              expect(transactionsResponse).toHaveLength(expectedTransactions);
              transactionsResponse.forEach((transaction) => {
                expect(transaction.getAccountId()).toBe(expectedAccountId);
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
          })
          .catch(done);
      } catch (error) {
        done(error);
      }
    });
    it("should fail when no account submited", (done) => {
      const request = new GetTransactionsByAccountRequest();
      client.getTransactionsByAccount(request, (error) => {
        expect(error).toBeDefined();
        done();
      });
    });
  });
});
