import { Injectable, signal } from '@angular/core';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { email } from '@angular/forms/signals';

export interface User {
  id?: string;
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
      return 'Err: Username already in use.';
    } else if (this.users().find((value) => value.email === user.email)) {
      return 'Err: Email already in use.';
    } else {
      this.addUser(user);
      return 'Succesfully registired user.';
    }
  }

  login(user: User): string {
    //will set to undefined if not in user list
    this._currentUser.set(
      this.users().find((value) => value.username === user.username && value.email === user.email),
    );
    if (this.currentUser()) {
      return 'Login succesful';
    } else {
      return 'Err: Incorrect username or email.';
    }
  }

  logout() {
    this._currentUser.set(undefined);
  }

  async loadUsers() {
    const snapshot = await getDocs(this.usersCollection);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as User[];
    this.users.set(data);
  }

  private async addUser(user: User) {
    await addDoc(this.usersCollection, user);
    this.loadUsers();
  }

  async updateUser(user: Partial<User>): Promise<string> {
    if (this.currentUser()) {
      if (this.users().find((value) => value.username === user.username)) {
        return 'Err: Username already in use.';
      } else if (this.users().find((value) => value.email === user.email)) {
        return 'Err: Email already in use.';
      }
      var currentId = this.currentUser()?.id as string;
      const userRef = doc(db, 'users', currentId);
      await updateDoc(userRef, { ...user });
      await this.loadUsers(); //it took me far too long to figure out I needed an wait here
      this._currentUser.set(this.users().find((value) => value.id === currentId));
      return 'Successfully updated user.';
    } else {
      return 'Err: Tried to update user while not logged-in. This should never happen.';
    }
  }
}
