import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  new: boolean = false
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.messageForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      sender: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      status: ['']
    });

    this.message$.subscribe(data => {
      this.message = data || new Message()
      if (this.message.email == "") { this.new = true }
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

  showInfo(type1: string, type2: string): void {
    this.toastr.info(`Sikeresen ${type1} egy üzenetet!`, `${type2}`, { timeOut: 3000 });
  }

  onSubmit(message: Message) {

    this.submitted = true

    if (this.messageForm.invalid) {
      return
    }

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
      this.showInfo('létrehoztál', 'Létrehozva')
    } else {
      this.messageService.update(message).subscribe(
        () => this.router.navigate(['dashboard/messages'])
      );
      this.showInfo('módosítottál', 'Módosítva');
    }

    this.messageService.upload(formData);
  }

}
