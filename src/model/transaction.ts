import { TransactionCategory } from './transaction-category';

export interface Transaction {
  id: string;
  amount: number;
  category: TransactionCategory;
  date: Date;
  notes: string;
  type: TransactionType;
}

export function value(transaction: Transaction): number {
  if (transaction.type === 'Income') {
    return transaction.amount;
  } else {
    return -transaction.amount;
  }
}

export type TransactionType = 'Income' | 'Expense';
