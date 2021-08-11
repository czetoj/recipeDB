import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/model/menu';
import { Recipe } from 'src/app/model/recipe';
import { MenuService } from 'src/app/service/menu.service';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit {

  menuForm: FormGroup;

  menu$: Observable<Menu> = this.activatedRoute.params.pipe(
    switchMap(params => this.menuService.get(params.id))
  );

  menu: Menu = new Menu()
  soupArray: string[] = []
  new: boolean = false
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      soup: ['', Validators.required],
      main: ['', Validators.required],
      salad: ['', Validators.required],
      dessert: ['', Validators.required],
      week: ['', [Validators.required, Validators.pattern("^([1-9][0-9]{0,2}|1000)$")]]
    });

    this.menu$.subscribe(data => {
      this.menu = data || new Menu()
      if (this.menu.name == "") { this.new = true }
      this.menuForm.get('name')?.setValue(this.menu.name)
      this.menuForm.get('soup')?.setValue(this.menu.soup)
      this.menuForm.get('main')?.setValue(this.menu.main)
      this.menuForm.get('salad')?.setValue(this.menu.salad)
      this.menuForm.get('dessert')?.setValue(this.menu.dessert)
      this.menuForm.get('week')?.setValue(this.menu.week)
    })
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.menuForm.patchValue({
        fileSource: file
      });
    }
  }

  showInfo(type1: string, type2: string): void {
    this.toastr.info(`Sikeresen ${type1} egy menüt!`, `${type2}`, { timeOut: 3000 });
  }

  get f() {
    return this.menuForm.controls
  }

  onSubmit(menu: Menu) {

    this.submitted = true

    if (this.menuForm.invalid) {
      return
    }

    this.menu.name = this.menuForm.value['name']
    this.menu.soup = this.menuForm.value['soup']
    this.menu.main = this.menuForm.value['main']
    this.menu.salad = this.menuForm.value['salad']
    this.menu.dessert = this.menuForm.value['dessert']
    this.menu.week = this.menuForm.value['week']

    const formData = new FormData()
    formData.append('file', this.menuForm.value['fileSource'])

    if (menu._id === "") {
      this.menuService.create(menu)
      this.router.navigate(['dashboard/menus'])
      this.showInfo('létrehoztál', 'Létrehozva')
    } else {
      this.menuService.update(menu).subscribe(
        () => this.router.navigate(['dashboard/menus'])
      );
      this.showInfo('módosítottál', 'Módosítva');
    }

    this.menuService.upload(formData);
  }


}
