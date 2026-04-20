import { Component, inject, signal, Signal } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction-service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  userService = inject(UserService);
  router = inject(Router);
  user = this.userService.currentUser;

  username = this.user()?.username;
  email = this.user()?.email;
  message = signal<string>('');

  ngOnInit() {
    if (!this.userService.currentUser()) {
      this.router.navigate(['login']);
    }
  }

  updateUsername() {
    this.userService
      .updateUser({ username: this.username })
      .then((value) => this.message.set(value));
  }

  updateEmail() {
    this.userService.updateUser({ email: this.email }).then((value) => this.message.set(value));
  }
}
