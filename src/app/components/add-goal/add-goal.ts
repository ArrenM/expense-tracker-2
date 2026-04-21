import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-add-goal',
  imports: [FormsModule],
  templateUrl: './add-goal.html',
  styleUrl: './add-goal.css',
})
export class AddGoal {
  categoryService = inject(CategoryService);
  userService = inject(UserService);

  categoryId!: string;
  amount: number = 0;

  message = signal<string>('');

  add() {
    if (this.categoryId) {
      //add
      if (
        this.userService.currentUser()?.budget.find((value) => value.category.id == this.categoryId)
      ) {
        //update current goal
        var index = this.userService
          .currentUser()
          ?.budget.findIndex((value) => value.category.id == this.categoryId)!;
        var newBudget = this.userService.currentUser()!.budget;
        newBudget[index] = {
          category: this.categoryService.getCategoryById(this.categoryId)!,
          amount: this.amount,
        };
        this.userService.updateUser({ budget: newBudget });
        this.message.set('Budget goal updated.');
      } else {
        this.userService.updateUser({
          budget: [
            ...this.userService.currentUser()!.budget,
            {
              category: this.categoryService.getCategoryById(this.categoryId)!,
              amount: this.amount,
            },
          ],
        });
        this.message.set('Budget goal added.');
      }

      this.reset();
    } else {
      this.message.set('Err: Must select a category.');
    }
  }

  reset() {
    this.amount = 0;
  }
}
