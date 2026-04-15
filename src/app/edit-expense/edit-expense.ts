import { Component, inject, input } from '@angular/core';
import { ExpenseService } from '../../service/expense-service';
import { Expense, ExpenseCategory } from '../../model/expense';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-expense',
  imports: [FormsModule],
  templateUrl: './edit-expense.html',
  styleUrl: './edit-expense.css',
})
export class EditExpense {
  id = input.required<string>();
  expenseService = inject(ExpenseService);
  router = inject(Router);
  expense!: Expense;

  //Get expense from id on initialization
  ngOnInit() {
    this.expense = this.expenseService.getExpenseById(this.id()) as Expense;
  }

  delete() {
    this.expenseService.deleteExpense(this.expense.id);
    //Return to list after deleting
    this.router.navigate(['expenses']);
  }
}
