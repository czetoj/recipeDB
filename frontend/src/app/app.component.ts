import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './model/recipe';
import { RecipeService } from './service/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  recipes: Observable<Recipe[]> = this.recipeService.getAll();

  constructor(
    private recipeService: RecipeService
  ) { }
}
