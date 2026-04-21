import { Component, inject, signal } from '@angular/core';
import { TransactionService, TransactionType } from '../../../services/transaction-service';
import { CategoryService } from '../../../services/category-service';
import { FormsModule } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-add-transaction',
  imports: [FormsModule],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.css',
})
export class AddTransaction {
  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);

  type: TransactionType = 'Expense';
  amount: number = 0;
  categoryId!: string;
  date!: Date;
  notes: string = '';

  message = signal<string>('');

  reset() {
    this.amount = 0;
    this.notes = '';
  }

  add() {
    if (this.categoryId && this.date) {
      this.transactionService.add({
        type: this.type,
        amount: this.amount,
        categoryId: this.categoryId,
        date: new Timestamp(new Date(this.date).getTime() / 1000, 0), //this date shit is so stupid
        notes: this.notes,
      });
      this.message.set('Transaction added.');
      this.reset();
    } else {
      this.message.set('Err: Must select a category and date.');
    }
  }
}
