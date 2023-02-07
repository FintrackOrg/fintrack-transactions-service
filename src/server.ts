import * as dotenv from "dotenv";
dotenv.config();
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { TransactionsController } from "./infraestructure/controllers/transactions.controller";
import { TransactionServiceService } from "./infraestructure/models/proto/transaction/v1/api_grpc_pb";
import { CONFIG, EnvVarsConfig } from "./config/env-vars.config";
import { DynamodbRepository } from "./infraestructure/repositories/dynamodb.repository";
import { TransactionsService } from "./application/transactions.service";

const main = () => {
  const server = new Server();
  const config = new EnvVarsConfig(CONFIG);
  const repo = new DynamodbRepository(config);
  const service = new TransactionsService(repo);
  const controller = new TransactionsController(service);
  server.addService(TransactionServiceService, controller.getImplementation());
  server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
    console.log("server start");
    server.start();
  });
};

main();
