import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userService = inject(UserService);
  router = inject(Router);
  username = '';
  email = '';
  message = '';

  login() {
    this.userService.login({ username: this.username, email: this.email });
    if (this.userService.currentUser()) {
      this.router.navigate(['..']);
    } else {
      this.message = 'Incorrect username or email.';
    }
  }

  register() {
    this.message = this.userService.register({ username: this.username, email: this.email });
  }
}
