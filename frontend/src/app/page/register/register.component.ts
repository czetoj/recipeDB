import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  // user$: Observable<User> = this.activatedRoute.params.pipe(
  //   switchMap(params => {
  //     if (params.id) {
  //       return this.userService.get(params.id)
  //     }
  //     return of(new User())
  //   })
  // );

  user: User = new User()
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nickName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // this.user$.subscribe(data => {
    //   this.user = data || new User()
    //   this.registerForm.get('firstName')?.setValue(this.user.firstName)
    //   this.registerForm.get('lastName')?.setValue(this.user.lastName)
    //   this.registerForm.get('nickName')?.setValue(this.user.nickName)
    //   this.registerForm.get('email')?.setValue(this.user.email)
    //   this.registerForm.get('password')?.setValue(this.user.password)
    // })
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.patchValue({
        fileSource: file
      });
    }
  }

  showInfo(type1: string, type2: string): void {
    this.toastr.info(`Sikeresen ${type1}!`, `${type2}`, { timeOut: 3000 });
  }

  get f() {
    return this.registerForm.controls
  }

  onSubmit() {

    this.submitted = true

    if (this.registerForm.invalid) {
      return
    }

    this.user.email = this.registerForm.value['email']
    this.user.firstName = this.registerForm.value['firstName']
    this.user.lastName = this.registerForm.value['lastName']
    this.user.nickName = this.registerForm.value['nickName']
    this.user.password = this.registerForm.value['password']
    this.user.role = 'user'

    this.userService.create(this.user).subscribe(
      () => {
        this.router.navigate(['/login'])
        this.showInfo('regisztráltál', 'Regisztrálva')
      }
    )
  }
}