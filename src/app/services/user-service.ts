import { Injectable, signal } from '@angular/core';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

export interface User {
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //array of user objects
  private users = signal<User[]>([]);

  //firebase collection of users
  private usersCollection = collection(db, 'users');

  //currently logged-in user as read-only signal
  private _currentUser = signal<User | undefined>(undefined);
  currentUser = this._currentUser.asReadonly();

  register(user: User): string {
    if (this.users().find((value) => value.username === user.username)) {
      return 'Username already in use.';
    } else if (this.users().find((value) => value.email === user.email)) {
      return 'Email already in use.';
    } else {
      this.addUser(user);
      return 'Registration successful!';
    }
  }

  login(user: User) {
    //will set to undefined if not in user list
    this._currentUser.set(
      this.users().find((value) => value.username === user.username && value.email === user.email),
    );
  }

  logout() {
    this._currentUser.set(undefined);
  }

  async loadUsers() {
    const snapshot = await getDocs(this.usersCollection);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as User[];
    this.users.set(data);
  }

  private async addUser(user: User) {
    await addDoc(this.usersCollection, user);
    this.loadUsers();
  }
}
