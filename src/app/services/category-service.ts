import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

export interface Category {
  id?: string;
  userId?: string;
  name: string;
  color: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private userService = inject(UserService);
  private user = this.userService.currentUser;

  //array of category objects
  private categories = signal<Category[]>([]);
  //array of category objects filtered for current user
  public userCategories = computed<Category[]>(() =>
    this.categories().filter((value) => value.userId == this.user()?.id || value.userId == ''),
  );

  //firebase collection of categories
  private categoryCollection = collection(db, 'categories');

  async loadCategories() {
    const snapshot = await getDocs(this.categoryCollection);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Category[];
    this.categories.set(data);
  }

  getCategoryById(id: string) {
    return this.userCategories().find((value) => value.id == id);
  }
}
