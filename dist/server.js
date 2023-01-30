"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_pb_1 = require("@buf/darvand_fintrackapis.community_timostamm-protobuf-ts/transaction/v1/api_pb");
var grpc_js_1 = require("@grpc/grpc-js");
var transactions_controller_1 = __importDefault(require("./infraestructure/controllers/transactions.controller"));
var main = function () {
    var server = new grpc_js_1.Server();
    server.addService(api_pb_1.TransactionService, transactions_controller_1.default);
    server.bindAsync("0.0.0.0:50051", grpc_js_1.ServerCredentials.createInsecure(), function () {
        console.log("server start");
        server.start();
    });
};
main();
