import { Component, inject, input, signal } from '@angular/core';
import { TransactionService, TransactionType } from '../../../services/transaction-service';
import { CategoryService } from '../../../services/category-service';
import { Timestamp } from 'firebase/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction',
  imports: [FormsModule],
  templateUrl: './edit-transaction.html',
  styleUrl: './edit-transaction.css',
})
export class EditTransaction {
  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);

  id = input.required<string>();

  type: TransactionType = 'Expense';
  amount: number = 0;
  categoryId!: string;
  date!: string;
  notes: string | undefined = '';

  message = signal<string>('');

  ngOnInit() {
    var transaction = this.transactionService.getTransactionById(this.id())!;
    var t = transaction.date.toDate();
    var m = (t.getMonth() + 1).toString();
    var d = t.getDate().toString();
    if (t.getMonth() + 1 < 10) {
      m = '0' + m;
    }
    if (t.getDate() < 10) {
      d = '0' + d;
    }
    console.log(this.id());
    console.log(transaction);
    this.type = transaction.type;
    this.amount = transaction.amount;
    this.categoryId = transaction.categoryId;
    this.date = t.getFullYear() + '-' + m + '-' + d;
    this.notes = transaction.notes;
  }

  reset() {
    this.amount = 0;
    this.notes = '';
  }

  edit() {
    if (this.categoryId && this.date) {
      this.transactionService.delete(this.id());
      this.transactionService.add({
        type: this.type,
        amount: this.amount,
        categoryId: this.categoryId,
        date: new Timestamp(new Date(this.date).getTime() / 1000, 0), //this date shit is so stupid
        notes: this.notes,
      });
      this.message.set('Transaction edited.');
      this.reset();
    } else {
      this.message.set('Err: Must select a category and date.');
    }
  }
}
