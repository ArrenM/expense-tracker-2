import { Component, inject, input } from '@angular/core';
import { Category, CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.html',
  styleUrl: './category-details.css',
})
export class CategoryDetails {
  id = input.required<string>();
  categoryService = inject(CategoryService);
  category!: Category;

  ngOnInit() {
    this.category = this.categoryService.getCategoryById(this.id())!;
  }
}
