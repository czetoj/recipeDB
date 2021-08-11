import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
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
    switchMap(params => {
      if (params.id) {
        return this.userService.get(params.id)
      }
      return of(new User())
    })
  );

  user: User = new User()
  new: boolean = false
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.userForm = this.fb.group({
      firstName: ['',
        Validators.required
      ],
      lastName: ['',
        Validators.required
      ],
      nickName: ['',
        Validators.required
      ],
      email: ['', [
        Validators.required, Validators.email
      ]],
      countOfRecipes: ['', [
        Validators.required, Validators.pattern("^([0-9][0-9]{0,2}|1000)$")
      ]],
      role: ['',
        Validators.required
      ]
    });

    this.user$.subscribe(data => {
      this.user = data || new User()
      if (this.user.firstName == "") { this.new = true }
      this.userForm.get('firstName')?.setValue(this.user.firstName)
      this.userForm.get('lastName')?.setValue(this.user.lastName)
      this.userForm.get('nickName')?.setValue(this.user.nickName)
      this.userForm.get('email')?.setValue(this.user.email)
      this.userForm.get('countOfRecipes')?.setValue(this.user.countOfRecipes)
      this.userForm.get('role')?.setValue(this.user.role)
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

  showInfo(type1: string, type2: string): void {
    this.toastr.info(`Sikeresen ${type1} egy felhasználót!`, `${type2}`, { timeOut: 3000 });
  }

  get f() {
    return this.userForm.controls
  }

  onSubmit() {

    this.submitted = true

    if (this.userForm.invalid) {
      return
    }

    this.user.email = this.userForm.value['email']
    this.user.firstName = this.userForm.value['firstName']
    this.user.lastName = this.userForm.value['lastName']
    this.user.nickName = this.userForm.value['nickName']
    this.user.countOfRecipes = this.userForm.value['countOfRecipes']
    this.user.role = this.userForm.value['role']

    if (this.user._id === "") {
      this.userService.create(this.user).subscribe(
        () => {
          this.router.navigate(['dashboard/users'])
          this.showInfo('létrehoztál', 'Létrehozva')
        }
      )
    } else {
      this.userService.update(this.user).subscribe(
        () => this.router.navigate(['dashboard/users'])
      );
      this.showInfo('módosítottál', 'Módosítva');
    }
  }
}