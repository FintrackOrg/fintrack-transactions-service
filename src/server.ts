import { TransactionService } from "@buf/darvand_fintrackapis.community_timostamm-protobuf-ts/transaction/v1/api_pb";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import transactionsController from "./infraestructure/controllers/transactions.controller";

const main = () => {
  const server = new Server();
  server.addService(TransactionService, transactionsController);
  server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
    console.log("server start");
    server.start();
  });
};

main();
