import { computed, inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { UserService } from './user-service';
import { Category } from './category-service';

export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
  id?: string;
  userId?: string;
  amount: number;
  category: Category;
  date?: Date;
  notes?: string[];
  type: TransactionType;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private userService = inject(UserService);
  private user = this.userService.currentUser;

  //array of transaction objects
  private transactions = signal<Transaction[]>([]);
  //array of transaction objects filtered for current user
  public userTransactions = computed<Transaction[]>(() =>
    this.transactions().filter((value) => value.userId == this.user()?.id),
  );

  //firebase collection of transactions
  private transactionCollection = collection(db, 'transactions');

  //load transactions from collection
  async loadTransactions() {
    const snapshot = await getDocs(this.transactionCollection);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Transaction[];
    this.transactions.set(data);
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.userTransactions().find((value) => value.id == id);
  }

  //returns net total of user's transactions
  getTransactionTotal(): number {
    var total = 0;
    for (var transaction of this.userTransactions()) {
      if (transaction.type == 'Expense') {
        total -= transaction.amount;
      } else {
        total += transaction.amount;
      }
    }
    return total;
  }

  async add(transaction: Transaction) {
    await addDoc(this.transactionCollection, { ...transaction, userId: this.user()?.id });
    this.loadTransactions();
  }
}
