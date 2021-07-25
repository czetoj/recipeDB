import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;

  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap(params => this.userService.get(params.id))
  );

  user: User = new User()

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      nickName: [''],
      email: [''],
      countOfRecipes: ['']
    });

    this.user$.subscribe(data => {
      this.user = data || new User()
      this.userForm.get('email')?.setValue(this.user.email)
      this.userForm.get('firstName')?.setValue(this.user.firstName)
      this.userForm.get('lastName')?.setValue(this.user.lastName)
      this.userForm.get('nickName')?.setValue(this.user.nickName)
      this.userForm.get('countOfRecipes')?.setValue(this.user.countOfRecipes)
    })
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.patchValue({
        fileSource: file
      });
    }
  }

  showInfo(type: string): void {
    this.toastr.info(`You have successfully ${type} a user!`, `${type}`, { timeOut: 3000 });
  }

  onSubmit(user: User) {

    this.user.email = this.userForm.value['email']
    this.user.firstName = this.userForm.value['firstName']
    this.user.lastName = this.userForm.value['lastName']
    this.user.nickName = this.userForm.value['nickName']
    this.user.countOfRecipes = this.userForm.value['countOfRecipes']

    const formData = new FormData()
    formData.append('file', this.userForm.value['fileSource'])

    if (user._id === "") {
      this.userService.create(user)
      this.router.navigate(['dashboard/users'])
      this.showInfo('created')
    } else {
      this.userService.update(user).subscribe(
        () => this.router.navigate(['dashboard/users'])
      );
      this.showInfo('updated');
    }

    this.userService.upload(formData);
  }

}
