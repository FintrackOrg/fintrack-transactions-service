"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamodbRepository = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var transactions_mapper_1 = require("../mappers/transactions.mapper");
var DynamodbRepository = /** @class */ (function () {
    function DynamodbRepository() {
        this.TABLE_NAME = "transactions";
        var REGION = "sa-east-1";
        var ddbClient = new client_dynamodb_1.DynamoDBClient({
            region: REGION,
            endpoint: "http://localhost:4566",
            credentials: {
                accessKeyId: "default_access_key",
                secretAccessKey: "default_secret_key",
            },
        });
        this.ddbDocumentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient);
    }
    DynamodbRepository.prototype.getByAccountIdAndTransactionId = function (accountId, transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var transactionsResult, productsResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ddbDocumentClient.send(new lib_dynamodb_1.QueryCommand({
                                TableName: this.TABLE_NAME,
                                KeyConditionExpression: "PK = :pk and begins_with(SK, :sk)",
                                ExpressionAttributeValues: { ":pk": "ACCOUNT#".concat(accountId), ":sk": "TRANSACTION#".concat(transactionId) },
                            }))];
                    case 1:
                        transactionsResult = _a.sent();
                        console.log("transactions", transactionsResult.Items);
                        return [4 /*yield*/, this.ddbDocumentClient.send(new lib_dynamodb_1.QueryCommand({
                                TableName: this.TABLE_NAME,
                                IndexName: "GSI1",
                                KeyConditionExpression: "GS1PK = :gs1pk",
                                ExpressionAttributeValues: { ":gs1pk": "ACCOUNT#".concat(accountId, "#TRANSACTION#").concat(transactionId) },
                            }))];
                    case 2:
                        productsResult = _a.sent();
                        console.log("products", productsResult);
                        return [2 /*return*/, transactions_mapper_1.TransactionMapper.fromDDBToTransactionValue(transactionsResult.Items, productsResult.Items)];
                    case 3:
                        error_1 = _a.sent();
                        console.error("On getByAccountIdAndTransactionId", error_1.message);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DynamodbRepository.prototype.getTransactionsDetails = function (transactionId) {
        return Promise.resolve([]);
    };
    DynamodbRepository.prototype.getByAccountId = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ddbDocumentClient.send(new lib_dynamodb_1.QueryCommand({
                                TableName: "transactions",
                                KeyConditionExpression: "PK = :pk",
                                ExpressionAttributeValues: { ":pk": "ACCOUNT#".concat(accountId) },
                            }))];
                    case 1:
                        result = _a.sent();
                        console.log("Query result", result.Items);
                        return [2 /*return*/, transactions_mapper_1.TransactionMapper.fromDDBAccountToTransactionValue(result.Items)];
                    case 2:
                        error_2 = _a.sent();
                        console.error("On getByAccountId", error_2.message);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DynamodbRepository;
}());
exports.DynamodbRepository = DynamodbRepository;
