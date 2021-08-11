import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  // recipeList$: BehaviorSubject<Recipe[]> = this.recipeService.list$;

  categoryList$: Observable<Recipe[]> = this.ar.params.pipe(
    switchMap(params => {
      if (params.category) {
        return this.recipeService.getCategory(params.category)
      }
      return this.categoryList$ = this.recipeService.list$
    }
    )
  )

  constructor(
    private recipeService: RecipeService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipeService.getAll();
  }

}
