import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/model/message';
import { ITableColumn, ConfigService } from 'src/app/service/config.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.scss']
})
export class ListMessageComponent implements OnInit {

  messageList$: BehaviorSubject<Message[]> = this.messageService.list$;
  messageProperties: string[] = Object.keys(new Message());

  filterKey = 'email';
  phrase = '';

  indexPage = 1;
  pagiLength = 5;
  ArrayLength = 0;
  ascend = true;
  sortKey = '';
  lastDragKey = "";

  cols: ITableColumn[] = this.config.messageColumns;

  constructor(
    private config: ConfigService,
    private messageService: MessageService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.messageService.getAll();
    this.messageList$.subscribe(data => {
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

  onDelete(message: Message): void {
    this.messageService.remove(message)
    this.showWarning();
    this.router.navigate(['dashboard/messages'])
  }

  showWarning(): void {
    this.toastr.warning('You have successfully deleted a message!', 'Deleted', { timeOut: 4000 });
  }

}
