import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/model/menu';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit {

  menuList$: BehaviorSubject<Menu[]> = this.menuService.list$;
  menuProperties: string[] = Object.keys(new Menu());

  filterKey = 'name';
  phrase = '';

  indexPage = 1;
  pagiLength = 5;
  ArrayLength = 0;
  ascend = true;
  sortKey = '';
  lastDragKey = "";

  cols: ITableColumn[] = this.config.menuColumns;

  constructor(
    private config: ConfigService,
    private menuService: MenuService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.menuService.getAll();
    this.menuList$.subscribe(data => {
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

  onDelete(menu: Menu): void {
    this.menuService.remove(menu)
    this.showWarning();
    this.router.navigate(['dashboard/menus'])
  }

  showWarning(): void {
    this.toastr.warning('Sikeresen törölted a menüt!', 'Törölve', { timeOut: 4000 });
  }

}
