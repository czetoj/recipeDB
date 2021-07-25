import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss']
})
export class EditMessageComponent implements OnInit {

  messageForm: FormGroup;

  message$: Observable<Message> = this.activatedRoute.params.pipe(
    switchMap(params => this.messageService.get(params.id))
  );

  message: Message = new Message()

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.messageForm = this.fb.group({
      email: [''],
      sender: [''],
      subject: [''],
      message: [''],
      status: ['']
    });

    this.message$.subscribe(data => {
      this.message = data || new Message()
      this.messageForm.get('email')?.setValue(this.message.email)
      this.messageForm.get('sender')?.setValue(this.message.sender)
      this.messageForm.get('subject')?.setValue(this.message.subject)
      this.messageForm.get('message')?.setValue(this.message.message)
      this.messageForm.get('status')?.setValue(this.message.status)
    })
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.messageForm.patchValue({
        fileSource: file
      });
    }
  }

  showInfo(type: string): void {
    this.toastr.info(`You have successfully ${type} an message!`, `${type}`, { timeOut: 3000 });
  }

  onSubmit(message: Message) {

    this.message.email = this.messageForm.value['email']
    this.message.sender = this.messageForm.value['sender']
    this.message.subject = this.messageForm.value['subject']
    this.message.message = this.messageForm.value['message']
    this.message.status = this.messageForm.value['status']

    const formData = new FormData()
    formData.append('file', this.messageForm.value['fileSource'])
    if (message._id === "") {
      this.messageService.create(message)
      this.router.navigate(['dashboard/messages'])
      this.showInfo('created')
    } else {
      this.messageService.update(message).subscribe(
        () => this.router.navigate(['dashboard/messages'])
      );
      this.showInfo('updated');
    }

    this.messageService.upload(formData);
  }

}
