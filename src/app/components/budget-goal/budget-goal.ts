import { Component, input } from '@angular/core';
import { BudgetGoal } from '../../services/user-service';
import { CategoryDetails } from '../categories/category-details/category-details';

@Component({
  selector: 'app-budget-goal',
  imports: [CategoryDetails],
  templateUrl: './budget-goal.html',
  styleUrl: './budget-goal.css',
})
export class BudgetGoalDetails {
  goal = input.required<BudgetGoal>();
}
