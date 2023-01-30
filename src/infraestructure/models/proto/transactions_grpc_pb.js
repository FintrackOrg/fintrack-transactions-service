// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var transactions_pb = require('./transactions_pb.js');

function serialize_transactions_GetTransactionsByAccountRequest(arg) {
  if (!(arg instanceof transactions_pb.GetTransactionsByAccountRequest)) {
    throw new Error('Expected argument of type transactions.GetTransactionsByAccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transactions_GetTransactionsByAccountRequest(buffer_arg) {
  return transactions_pb.GetTransactionsByAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_transactions_GetTransactionsByAccountResponse(arg) {
  if (!(arg instanceof transactions_pb.GetTransactionsByAccountResponse)) {
    throw new Error('Expected argument of type transactions.GetTransactionsByAccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_transactions_GetTransactionsByAccountResponse(buffer_arg) {
  return transactions_pb.GetTransactionsByAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransactionsService = exports.TransactionsService = {
  getTransactionsByAccount: {
    path: '/transactions.Transactions/GetTransactionsByAccount',
    requestStream: false,
    responseStream: false,
    requestType: transactions_pb.GetTransactionsByAccountRequest,
    responseType: transactions_pb.GetTransactionsByAccountResponse,
    requestSerialize: serialize_transactions_GetTransactionsByAccountRequest,
    requestDeserialize: deserialize_transactions_GetTransactionsByAccountRequest,
    responseSerialize: serialize_transactions_GetTransactionsByAccountResponse,
    responseDeserialize: deserialize_transactions_GetTransactionsByAccountResponse,
  },
};

exports.TransactionsClient = grpc.makeGenericClientConstructor(TransactionsService);
