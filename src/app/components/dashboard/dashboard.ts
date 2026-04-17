import { Component, inject, input, signal } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  userService = inject(UserService);
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
