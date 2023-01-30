"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMapper = void 0;
var transactions_entity_1 = require("../../domain/transactions.entity");
var transactions_value_1 = require("../../domain/transactions.value");
var TransactionMapper = /** @class */ (function () {
    function TransactionMapper() {
    }
    TransactionMapper.fromDDBToTransactionValue = function (transactionsResult, productsResult) {
        var transactionsModel = transactionsResult;
        var products = productsResult;
        var details = transactionsModel.map(function (detail) {
            var gs1sk = detail.GS1SK.split("#");
            var product = products.find(function (p) { return p.SK === "PRODUCT#".concat(gs1sk[5], "#TRANSACTION#").concat(gs1sk[1]); });
            return {
                id: detail.SK.split("#")[3],
                category: transactions_entity_1.Categories.CLOTHS,
                quantity: detail.Quantity,
                total: detail.UnitValue * detail.Quantity,
                unitValue: detail.UnitValue,
                name: product.Name,
                brand: product.Brand,
            };
        });
        var value = details.reduce(function (accum, detail) { return accum + detail.total; }, 0);
        return new transactions_value_1.TransactionValue({
            id: transactionsModel[0].SK.split("#")[1],
            accountId: transactionsModel[0].PK.split("#")[1],
            userId: transactionsModel[0].UserId,
            date: transactionsModel[0].Date,
            paymentMethod: transactions_entity_1.PaymentMethods.CASH,
            source: transactionsModel[0].Source,
            details: details,
            value: value,
        });
    };
    TransactionMapper.fromDDBAccountToTransactionValue = function (allItems) {
        var _this = this;
        var transactions = allItems.filter(function (item) { return item.Type === "TRANSACTION"; });
        var products = allItems.filter(function (item) { return item.Type === "PRODUCT"; });
        var transactionIds = Array.from(new Set(transactions.map(function (transaction) { return "TRANSACTION#".concat(transaction.SK.split("#")[1]); })));
        var values = transactionIds.reduce(function (accum, transactionId) {
            var transactionsGroupped = transactions.filter(function (transaction) { return transaction.SK.includes(transactionId); });
            var productsGroupped = products.filter(function (product) { return product.SK.includes(transactionId); });
            return __spreadArray(__spreadArray([], accum, true), [[transactionsGroupped, productsGroupped]], false);
        }, []);
        return values.map(function (_a) {
            var t = _a[0], p = _a[1];
            return _this.fromDDBToTransactionValue(t, p);
        });
    };
    return TransactionMapper;
}());
exports.TransactionMapper = TransactionMapper;
