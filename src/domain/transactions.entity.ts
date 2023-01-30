export enum PaymentMethods {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
  CASH = "CASH",
}

export enum Categories {
  GROCERIES = "GROCERIES",
  FOOD = "FOOD",
  CLOTHS = "CLOTHS",
  PETS = "PETS",
  HOUSE = "HOUSE",
}

export type TransactionDetailEntity = {
  id: string;
  category: Categories;
  quantity: number;
  total: number;
  unitValue: number;
  name: string;
  brand: string;
};

export type TransactionEntity = {
  id: string;
  source: string;
  value: number;
  date: string;
  paymentMethod: PaymentMethods;
  accountId: string;
  userId: string;
  details: TransactionDetailEntity[];
};
