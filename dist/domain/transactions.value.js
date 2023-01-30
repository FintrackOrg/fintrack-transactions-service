"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionValue = void 0;
var uuid_1 = require("uuid");
var TransactionValue = /** @class */ (function () {
    function TransactionValue(transaction) {
        this.id = (0, uuid_1.v4)();
        this.source = transaction.source;
        this.value = transaction.value;
        this.date = transaction.date;
        this.paymentMethod = transaction.paymentMethod;
        this.details = transaction.details;
        this.accountId = transaction.accountId;
        this.userId = transaction.userId;
    }
    return TransactionValue;
}());
exports.TransactionValue = TransactionValue;
