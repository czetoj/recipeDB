import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/model/menu';
import { Recipe } from 'src/app/model/recipe';
import { MenuService } from 'src/app/service/menu.service';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-menuajanlo',
  templateUrl: './menuajanlo.component.html',
  styleUrls: ['./menuajanlo.component.scss']
})
export class MenuajanloComponent implements OnInit {

  menuList$: Observable<Menu[]> = this.menuService.list$
  recipeList$: Observable<Recipe[]> = this.recipeService.list$

  soup = (i: number) => {
    return this.recipeList$.pipe(
      switchMap(recipe => of(this.recipeService.list$.value.filter(item => item.name === this.menuService.list$.value[i].soup)))
    )
  }

  main = (i: number) => {
    return this.recipeList$.pipe(
      switchMap(recipe => of(this.recipeService.list$.value.filter(item => item.name === this.menuService.list$.value[i].main)))
    )
  }

  salad = (i: number) => {
    return this.recipeList$.pipe(
      switchMap(recipe => of(this.recipeService.list$.value.filter(item => item.name === this.menuService.list$.value[i].salad)))
    )
  }
  dessert = (i: number) => {
    return this.recipeList$.pipe(
      switchMap(recipe => of(this.recipeService.list$.value.filter(item => item.name === this.menuService.list$.value[i].dessert)))
    )
  }



  constructor(
    private menuService: MenuService,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.menuService.getAll()
  }

}
