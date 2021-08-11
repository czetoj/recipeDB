import { Component, NgIterable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  // userList$: BehaviorSubject<User[]> = this.userService.list$;
  userList$: Observable<User | User[] | NgIterable<User> | null | undefined | any> = this.userService.get();
  userProperties: string[] = Object.keys(new User());

  filterKey = 'lastName';
  phrase = '';

  indexPage = 1;
  pagiLength = 5;
  ArrayLength = 0;
  ascend = true;
  sortKey = '';
  lastDragKey = "";

  cols: ITableColumn[] = this.config.userColumns;

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // this.userService.getAll();
    this.userList$.subscribe(data => {
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

  onDelete(user: User): void {
    this.userService.remove(user).subscribe(
      () => {
        this.showWarning();
        this.userList$ = this.userService.get()
        this.router.navigate(['dashboard/users'])
      }
    )
  }

  showWarning(): void {
    this.toastr.warning('Sikeresen töröltél egy felhasználót!', 'Törölve', { timeOut: 4000 });
  }

}
