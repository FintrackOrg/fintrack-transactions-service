// package: transactions
// file: transactions.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetTransactionsByAccountRequest extends jspb.Message { 
    getAccountId(): string;
    setAccountId(value: string): GetTransactionsByAccountRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionsByAccountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionsByAccountRequest): GetTransactionsByAccountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionsByAccountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionsByAccountRequest;
    static deserializeBinaryFromReader(message: GetTransactionsByAccountRequest, reader: jspb.BinaryReader): GetTransactionsByAccountRequest;
}

export namespace GetTransactionsByAccountRequest {
    export type AsObject = {
        accountId: string,
    }
}

export class GetTransactionsByAccountResponse extends jspb.Message { 
    clearTransactionsList(): void;
    getTransactionsList(): Array<Transaction>;
    setTransactionsList(value: Array<Transaction>): GetTransactionsByAccountResponse;
    addTransactions(value?: Transaction, index?: number): Transaction;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionsByAccountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionsByAccountResponse): GetTransactionsByAccountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionsByAccountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionsByAccountResponse;
    static deserializeBinaryFromReader(message: GetTransactionsByAccountResponse, reader: jspb.BinaryReader): GetTransactionsByAccountResponse;
}

export namespace GetTransactionsByAccountResponse {
    export type AsObject = {
        transactionsList: Array<Transaction.AsObject>,
    }
}

export class Transaction extends jspb.Message { 
    getId(): string;
    setId(value: string): Transaction;
    getSource(): string;
    setSource(value: string): Transaction;
    getValue(): number;
    setValue(value: number): Transaction;
    getDate(): string;
    setDate(value: string): Transaction;
    getPaymentMethod(): PaymentMethod;
    setPaymentMethod(value: PaymentMethod): Transaction;
    getAccountid(): string;
    setAccountid(value: string): Transaction;
    getUserid(): string;
    setUserid(value: string): Transaction;
    clearDetailsList(): void;
    getDetailsList(): Array<TransactionDetail>;
    setDetailsList(value: Array<TransactionDetail>): Transaction;
    addDetails(value?: TransactionDetail, index?: number): TransactionDetail;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Transaction.AsObject;
    static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Transaction;
    static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
    export type AsObject = {
        id: string,
        source: string,
        value: number,
        date: string,
        paymentMethod: PaymentMethod,
        accountid: string,
        userid: string,
        detailsList: Array<TransactionDetail.AsObject>,
    }
}

export class TransactionDetail extends jspb.Message { 
    getId(): string;
    setId(value: string): TransactionDetail;
    getQuantity(): number;
    setQuantity(value: number): TransactionDetail;
    getName(): string;
    setName(value: string): TransactionDetail;
    getValue(): number;
    setValue(value: number): TransactionDetail;
    getCategory(): Category;
    setCategory(value: Category): TransactionDetail;
    getTotal(): number;
    setTotal(value: number): TransactionDetail;
    getUnitvalue(): number;
    setUnitvalue(value: number): TransactionDetail;
    getBrand(): string;
    setBrand(value: string): TransactionDetail;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionDetail.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionDetail): TransactionDetail.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionDetail, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionDetail;
    static deserializeBinaryFromReader(message: TransactionDetail, reader: jspb.BinaryReader): TransactionDetail;
}

export namespace TransactionDetail {
    export type AsObject = {
        id: string,
        quantity: number,
        name: string,
        value: number,
        category: Category,
        total: number,
        unitvalue: number,
        brand: string,
    }
}

export enum PaymentMethod {
    CREDIT = 0,
    DEBIT = 1,
    CASH = 2,
}

export enum Category {
    GROCERIES = 0,
    FOOD = 1,
    CLOTHS = 2,
    PETS = 3,
    HOUSE = 4,
}
