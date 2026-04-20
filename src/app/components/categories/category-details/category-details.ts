import { Component, input } from '@angular/core';
import { Category } from '../../../services/category-service';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.html',
  styleUrl: './category-details.css',
})
export class CategoryDetails {
  category = input.required<Category>();
}
