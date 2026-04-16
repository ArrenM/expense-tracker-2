import { computed, Injectable, signal } from '@angular/core';
import { Transaction, value } from '../model/transaction';
import { TransactionCategory } from '../model/transaction-category';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  categories = signal<TransactionCategory[]>([
    { id: 0, name: 'Food', icon: '', color: 'Red' },
    { id: 1, name: 'Rent', icon: '', color: 'Blue' },
    { id: 2, name: 'Travel', icon: '', color: 'Green' },
  ]);
  transactions = signal<Transaction[]>([]);

  nextId = signal<number>(0);

  totalExpense = computed(() => {
    let total = 0;
    for (let transaction of this.transactions()) {
      total += value(transaction);
    }
    return total;
  });

  transactionCount = computed(() => {
    return this.transactions().length;
  });

  addCategory(name: string, icon: string, color: string) {
    this.categories.update((value) => [
      ...value,
      { id: this.categories().length, name: name, icon: icon, color: color },
    ]);
  }

  addTransaction(transaction: Transaction) {
    this.transactions.update((value) => [...value, transaction]);
    this.nextId.update((value) => value + 1);
  }

  deleteTransaction(id: String) {
    this.transactions.update((value) => value.filter((item) => item.id != id));
  }

  getTransactionById(id: String): Transaction | undefined {
    return this.transactions().find((value) => value.id === id);
  }
}
