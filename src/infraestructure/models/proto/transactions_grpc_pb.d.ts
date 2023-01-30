// package: transactions
// file: transactions.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as transactions_pb from "./transactions_pb";

interface ITransactionsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getTransactionsByAccount: ITransactionsService_IGetTransactionsByAccount;
}

interface ITransactionsService_IGetTransactionsByAccount extends grpc.MethodDefinition<transactions_pb.GetTransactionsByAccountRequest, transactions_pb.GetTransactionsByAccountResponse> {
    path: "/transactions.Transactions/GetTransactionsByAccount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<transactions_pb.GetTransactionsByAccountRequest>;
    requestDeserialize: grpc.deserialize<transactions_pb.GetTransactionsByAccountRequest>;
    responseSerialize: grpc.serialize<transactions_pb.GetTransactionsByAccountResponse>;
    responseDeserialize: grpc.deserialize<transactions_pb.GetTransactionsByAccountResponse>;
}

export const TransactionsService: ITransactionsService;

export interface ITransactionsServer {
    getTransactionsByAccount: grpc.handleUnaryCall<transactions_pb.GetTransactionsByAccountRequest, transactions_pb.GetTransactionsByAccountResponse>;
}

export interface ITransactionsClient {
    getTransactionsByAccount(request: transactions_pb.GetTransactionsByAccountRequest, callback: (error: grpc.ServiceError | null, response: transactions_pb.GetTransactionsByAccountResponse) => void): grpc.ClientUnaryCall;
    getTransactionsByAccount(request: transactions_pb.GetTransactionsByAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: transactions_pb.GetTransactionsByAccountResponse) => void): grpc.ClientUnaryCall;
    getTransactionsByAccount(request: transactions_pb.GetTransactionsByAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: transactions_pb.GetTransactionsByAccountResponse) => void): grpc.ClientUnaryCall;
}

export class TransactionsClient extends grpc.Client implements ITransactionsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getTransactionsByAccount(request: transactions_pb.GetTransactionsByAccountRequest, callback: (error: grpc.ServiceError | null, response: transactions_pb.GetTransactionsByAccountResponse) => void): grpc.ClientUnaryCall;
    public getTransactionsByAccount(request: transactions_pb.GetTransactionsByAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: transactions_pb.GetTransactionsByAccountResponse) => void): grpc.ClientUnaryCall;
    public getTransactionsByAccount(request: transactions_pb.GetTransactionsByAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: transactions_pb.GetTransactionsByAccountResponse) => void): grpc.ClientUnaryCall;
}
