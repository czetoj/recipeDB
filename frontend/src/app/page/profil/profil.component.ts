import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  profilForm: FormGroup;

  userSub: Subscription = new Subscription()
  user: User | null = new User()
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.profilForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nickName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countOfRecipes: ['', [Validators.required, Validators.pattern("^([0-9][0-9]{0,2}|1000)$")]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(
      user => {
        this.user = user
        this.profilForm.get('firstName')?.setValue(this.user?.firstName)
        this.profilForm.get('lastName')?.setValue(this.user?.lastName)
        this.profilForm.get('nickName')?.setValue(this.user?.nickName)
        this.profilForm.get('email')?.setValue(this.user?.email)
        this.profilForm.get('countOfRecipes')?.setValue(this.user?.countOfRecipes)
        this.profilForm.get('password')?.setValue(this.user?.password)
      }
    )
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profilForm.patchValue({
        fileSource: file
      });
    }
  }

  showInfo(type1: string, type2: string): void {
    this.toastr.info(`Sikeresen ${type1} az adataidat!`, `${type2}`, { timeOut: 3000 });
  }

  get f() {
    return this.profilForm.controls
  }

  onSubmit() {

    this.submitted = true

    if (this.profilForm.invalid) {
      return
    }

    this.user!.email = this.profilForm.value['email']
    this.user!.firstName = this.profilForm.value['firstName']
    this.user!.lastName = this.profilForm.value['lastName']
    this.user!.nickName = this.profilForm.value['nickName']
    this.user!.countOfRecipes = this.profilForm.value['countOfRecipes']
    this.user!.password = this.profilForm.value['password']

      this.userService.update(this.user!).subscribe(
        () => this.router.navigate(['/'])
      );
      this.showInfo('módosítottad', 'Módosítva');
  }
}