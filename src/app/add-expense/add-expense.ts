import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../service/expense-service';
import { FormsModule } from '@angular/forms';
import { Expense, ExpenseCategory } from '../../model/expense';
import { sampleTime, timeInterval, timestamp } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense {
  expenseService = inject(ExpenseService);
  title = '';
  amount = 0;
  category: ExpenseCategory = 'None';
  success = false;

  add() {
    if (this.title != '' && this.category != 'None') {
      //Add to expenseService
      this.expenseService.addExpense({
        id: this.expenseService.nextId().toString(),
        title: this.title,
        amount: this.amount,
        category: this.category,
      });

      //Reset input fields
      this.title = '';
      this.amount = 0;
      this.category = 'None';

      this.success = true;
    } else {
      this.success = false;
    }
  }
}
