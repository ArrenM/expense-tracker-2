import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { UserService } from './services/user-service';
import { TransactionService } from './services/transaction-service';
import { CategoryService } from './services/category-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('expense-tracker');
  userService = inject(UserService);
  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);

  ngOnInit() {
    this.userService.loadUsers();
    this.categoryService.loadCategories();
    this.transactionService.loadTransactions();
  }
}
