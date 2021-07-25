import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  recipeList$: BehaviorSubject<Recipe[]> = this.recipeService.list$;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAll();
  }

}
