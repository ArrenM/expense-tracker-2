import { Component, inject, signal } from '@angular/core';
import { RedirectCommand, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('expense-tracker');
  userService = inject(UserService);

  ngOnInit() {
    this.userService.loadUsers();
  }
}
