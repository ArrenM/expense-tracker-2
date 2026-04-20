import { Component, inject, input, signal } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { TransactionService } from '../../services/transaction-service';
import { CategoryService } from '../../services/category-service';
import { TransactionDetails } from '../transactions/transaction-details/transaction-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [TransactionDetails, RouterLink],
})
export class Dashboard {
  userService = inject(UserService);
  transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  user!: User;

  ngOnInit() {
    if (!this.userService.currentUser()) {
      this.router.navigate(['login']);
    } else {
      this.user = this.userService.currentUser() as User;
    }
  }
}
