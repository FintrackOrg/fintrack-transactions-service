"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var transaction_pb_1 = require("@buf/darvand_fintrackapis.community_timostamm-protobuf-ts/transaction/v1/transaction_pb");
var transactions_service_1 = require("../../application/transactions.service");
var transactions_entity_1 = require("../../domain/transactions.entity");
var dynamodb_repository_1 = require("../repositories/dynamodb.repository");
var paymentMethodToProto = function (paymentMethod) {
    var _a;
    return ((_a = {},
        _a[transactions_entity_1.PaymentMethods.CASH] = transaction_pb_1.PaymentMethod.CASH,
        _a[transactions_entity_1.PaymentMethods.CREDIT] = transaction_pb_1.PaymentMethod.CREDIT,
        _a[transactions_entity_1.PaymentMethods.DEBIT] = transaction_pb_1.PaymentMethod.DEBIT,
        _a)[paymentMethod]);
};
var categoryToProto = function (category) {
    var _a;
    return ((_a = {},
        _a[transactions_entity_1.Categories.GROCERIES] = transaction_pb_1.Category.GROCERIES,
        _a[transactions_entity_1.Categories.FOOD] = transaction_pb_1.Category.FOOD,
        _a[transactions_entity_1.Categories.CLOTHS] = transaction_pb_1.Category.CLOTHS,
        _a[transactions_entity_1.Categories.PETS] = transaction_pb_1.Category.PETS,
        _a[transactions_entity_1.Categories.HOUSE] = transaction_pb_1.Category.HOUSE,
        _a)[category]);
};
var TransactionsController = /** @class */ (function () {
    function TransactionsController(transactionsService) {
        this.transactionsService = transactionsService;
    }
    TransactionsController.prototype.getImplementation = function () {
        var service = this.transactionsService;
        return {
            getTransactionsByAccount: function (call, callback) {
                return __awaiter(this, void 0, void 0, function () {
                    var transactionList, transactions, response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!call.request.accountId) {
                                    return [2 /*return*/, callback(new Error("left account id"))];
                                }
                                return [4 /*yield*/, service.getAccountTransactions(call.request.accountId)];
                            case 1:
                                transactionList = _a.sent();
                                return [4 /*yield*/, service.getTransactionDetails("1", "1")];
                            case 2:
                                _a.sent();
                                console.log("transactionList", transactionList);
                                transactions = transactionList.map(function (transaction) { return (__assign(__assign({}, transaction), { paymentMethod: paymentMethodToProto(transaction.paymentMethod), details: transaction.details.map(function (detail) { return (__assign(__assign({}, detail), { category: categoryToProto(detail.category), value: detail.total })); }) })); });
                                response = { transactions: transactions };
                                callback(null, response);
                                return [2 /*return*/];
                        }
                    });
                });
            },
        };
    };
    return TransactionsController;
}());
exports.default = new TransactionsController(new transactions_service_1.TransactionsService(new dynamodb_repository_1.DynamodbRepository())).getImplementation();
