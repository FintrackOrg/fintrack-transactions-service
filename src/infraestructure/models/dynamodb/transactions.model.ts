export type TransactionDDB = AccountModelDDB | TransactionModelDDB | ProductModelDDB;

export type AccountModelDDB = {
  PK: string;
  SK: string;
  Type: string;
};

export type TransactionModelDDB = {
  PK: string;
  SK: string;
  Type: string;
  Quantity: number;
  UnitValue: number;
  Total: number;
  PaymentMethod: string;
  Source: string;
  Date: string;
  UserId: string;
  GS1PK: string;
  GS1SK: string;
};

export type ProductModelDDB = {
  PK: string;
  SK: string;
  Type: string;
  Name: string;
  Brand: string;
  Category: string;
  GS1PK: string;
  GS1SK: string;
};
