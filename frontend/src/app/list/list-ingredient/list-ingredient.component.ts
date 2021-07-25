import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.scss']
})
export class ListIngredientComponent implements OnInit {
  ingredientList$: BehaviorSubject<Ingredient[]> = this.ingredientService.list$;
  ingredientProperties: string[] = Object.keys(new Ingredient());

  filterKey = 'name';
  phrase = '';

  indexPage = 1;
  pagiLength = 5;
  ArrayLength = 0;
  ascend = true;
  sortKey = '';
  lastDragKey = "";

  cols: ITableColumn[] = this.config.ingredientColumns;

  constructor(
    private config: ConfigService,
    private ingredientService: IngredientService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.ingredientService.getAll();
    this.ingredientList$.subscribe(data => {
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

  onDelete(ingredient: Ingredient): void {
    this.ingredientService.remove(ingredient)
    this.showWarning();
    this.router.navigate(['dashboard/ingredients'])
  }

  showWarning(): void {
    this.toastr.warning('You have successfully deleted a ingredient!', 'Deleted', { timeOut: 4000 });
  }
}
