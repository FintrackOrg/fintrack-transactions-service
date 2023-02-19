/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITransactionServiceServer as server } from "@fintrack-grpc/proto/transaction/v1/api_grpc_pb";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

declare module "@fintrack-grpc/proto/transaction/v1/api_grpc_pb" {
  type GRPCServer = {
    [key in keyof server]: (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => Promise<void>;
  };
}
