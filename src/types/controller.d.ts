/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITransactionServiceServer } from "@fintrack-grpc/proto/transaction/v1/api_grpc_pb";
import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";

declare module "@fintrack-grpc/proto/transaction/v1/api_grpc_pb" {
  export type ITransactionServiceServer = {
    [key in keyof server]: (call: ServerUnaryCall<any, any>, callback: sendUnaryData<any>) => Promise<void>;
  };
}
