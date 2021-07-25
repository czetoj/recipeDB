import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from 'src/app/model/recipe';
import { ConfigService, ITableColumn } from 'src/app/service/config.service';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.scss']
})
export class ListRecipeComponent implements OnInit {

  recipeList$: BehaviorSubject<Recipe[]> = this.recipeService.list$;
  recipeProperties: string[] = Object.keys(new Recipe());

  filterKey = 'name';
  phrase = '';

  indexPage = 1;
  pagiLength = 5;
  ArrayLength = 0;
  ascend = true;
  sortKey = '';
  lastDragKey = "";

  cols: ITableColumn[] = this.config.recipeColumns;

  constructor(
    private config: ConfigService,
    private recipeService: RecipeService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.recipeService.getAll();
    this.recipeList$.subscribe(data => {
      this.ArrayLength = data.length
    });
  }

  onHeaderDragStart(event: DragEvent): void {
    this.lastDragKey = (event.target as HTMLTableHeaderCellElement).id;
    console.log(this.lastDragKey);
  }

  onHeaderDrop(event: DragEvent): void {
    event.preventDefault();
    const targetID: string = (event.target as HTMLTableHeaderCellElement).id;
    const from = this.cols.findIndex(col => col.key === this.lastDragKey);
    const to = this.cols.findIndex(col => col.key === targetID);
    const temp = Object.assign({}, this.cols[from]);
    this.cols.splice(from, 1);
    this.cols.splice(to, 0, temp);
  }

  onLength(length: number) {
    this.pagiLength = length;
  }
  onIndex(length: number) {
    this.indexPage = length;
  }

  onChangeSort(data: string): void {
    this.sortKey = data;
    this.ascend = !this.ascend;
  }

  onDelete(recipe: Recipe): void {
    this.recipeService.remove(recipe)
    this.showWarning();
    this.router.navigate(['dashboard/recipes'])
  }

  showWarning(): void {
    this.toastr.warning('You have successfully deleted a recipe!', 'Deleted', { timeOut: 4000 });
  }
}
