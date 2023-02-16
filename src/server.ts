import * as dotenv from "dotenv";
dotenv.config();
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { TransactionsController } from "./infraestructure/controllers/transactions.controller";
import { TransactionServiceService } from "./infraestructure/models/proto/transaction/v1/api_grpc_pb";
import { CONFIG, EnvVarsConfig } from "./config/env-vars.config";
import { DynamodbRepository } from "./infraestructure/repositories/dynamodb.repository";
import { TransactionsService } from "./application/services/transactions.service";
import { Logger } from "./config/logger.config";

let server: Server;
const logger = new Logger("server").logger;

export const start = () => {
  server = new Server();
  const config = new EnvVarsConfig(CONFIG);
  const repo = new DynamodbRepository(config);
  const service = new TransactionsService(repo);
  const controller = new TransactionsController(service);
  server.addService(TransactionServiceService, controller.getImplementation());
  return new Promise<void>((resolve, reject) => {
    server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        logger.error(error.message);
        reject(error);
      }
      server.start();
      logger.info(`Server start on port ${port}`);
      resolve();
    });
  });
};

export const shutdown = () => {
  server.tryShutdown(() => {
    logger.info("gRPC Server shutdown...");
  });
};
