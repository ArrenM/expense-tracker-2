import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../service/expense-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  expenseService = inject(ExpenseService);
}
