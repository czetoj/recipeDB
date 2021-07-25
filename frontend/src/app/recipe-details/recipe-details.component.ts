import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  recipe$: Observable<Recipe> = this.activatedRoute.params.pipe(
    switchMap(params => this.recipeService.get(params.azonosito))
  );

  recipe: Recipe = new Recipe()

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.recipe$.subscribe(data => {
      this.recipe = data
    })
  }

  ngOnInit(): void {
    this.recipe$.subscribe(data => {
      this.recipe = data
      console.log(data);
    })
  }

}
