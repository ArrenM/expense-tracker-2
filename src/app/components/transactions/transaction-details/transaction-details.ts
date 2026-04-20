import { Component, inject, input } from '@angular/core';
import { Transaction, TransactionService } from '../../../services/transaction-service';
import { CategoryDetails } from '../../categories/category-details/category-details';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-transaction-details',
  imports: [CategoryDetails, RouterLink],
  templateUrl: './transaction-details.html',
  styleUrl: './transaction-details.css',
})
export class TransactionDetails {
  transaction = input.required<Transaction>();
  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);
}
