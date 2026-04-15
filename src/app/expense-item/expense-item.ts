import { Component, inject, input } from '@angular/core';
import { Expense } from '../../model/expense';
import { ExpenseService } from '../../service/expense-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-item',
  imports: [RouterLink],
  templateUrl: './expense-item.html',
  styleUrl: './expense-item.css',
})
export class ExpenseItem {
  expense = input.required<Expense>();
  expenseService = inject(ExpenseService);

  delete() {
    this.expenseService.deleteExpense(this.expense().id);
  }
}
