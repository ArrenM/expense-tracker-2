import { Component, computed, inject, signal } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { Transaction, TransactionService } from '../../services/transaction-service';
import { Category, CategoryService } from '../../services/category-service';
import { TransactionDetails } from '../transactions/transaction-details/transaction-details';
import { FormsModule } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [TransactionDetails, RouterLink, FormsModule],
})
export class Dashboard {
  //injections
  userService = inject(UserService);
  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);
  router = inject(Router);

  user!: User;

  //filter stuff
  dateStart = signal<string>(new Date(0, 0).toDateString());
  dateEnd = signal<string>(new Date(9999, 11).toDateString());
  categoryFilter = signal<string>('');
  maxAmount = signal<number>(1e6);
  minAmount = signal<number>(0);

  filteredTransactions = computed<Transaction[]>(() =>
    this.transactionService
      .userTransactions()
      .filter((value) => {
        return (
          (value.categoryId == this.categoryFilter() || this.categoryFilter() == '') &&
          value.amount <= this.maxAmount() &&
          value.amount >= this.minAmount() &&
          value.date.seconds >= new Date(this.dateStart()).getTime() / 1000 &&
          value.date.seconds <= new Date(this.dateEnd()).getTime() / 1000
        );
      })
      .sort((a, b) => b.date.seconds - a.date.seconds),
  );

  //absolute clusterfuck of a signal right here
  spendingByCategory = computed<{ category: Category; amount: number }[]>(() => {
    var result: { category: Category; amount: number }[] = [];
    for (let category of this.categoryService.userCategories()) {
      var total = 0;
      for (let transaction of this.transactionService.userTransactions().filter((value) => {
        return value.categoryId == category.id;
      })) {
        if (transaction.type == 'Expense') {
          total += transaction.amount;
        }
      }
      result.push({ category: category, amount: total });
    }
    return result;
  });

  spendingTotal = computed<number>(() => {
    var total = 0;
    for (let transaction of this.transactionService.userTransactions()) {
      if (transaction.type == 'Expense') {
        total += transaction.amount;
      }
    }
    return total;
  });

  ngOnInit() {
    if (!this.userService.currentUser()) {
      this.router.navigate(['login']);
    } else {
      this.user = this.userService.currentUser() as User;
    }
  }

  clearFilter() {
    this.categoryFilter.set('');
    this.minAmount.set(0);
    this.maxAmount.set(1e6);
    this.dateStart.set(new Date(0, 0).toDateString());
    this.dateEnd.set(new Date(9999, 11).toDateString());
  }
}
