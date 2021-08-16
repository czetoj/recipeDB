import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ingredient } from 'src/app/model/ingredient';
import { IngredientService } from 'src/app/service/ingredient.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent implements OnInit {

  ingredientForm: FormGroup;

  ingredient$: Observable<Ingredient> = this.activatedRoute.params.pipe(
    switchMap(params => this.ingredientService.get(params.id))
  );

  ingredient: Ingredient = new Ingredient()
  new: boolean = false
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      calory: ['', [Validators.required, Validators.pattern("^([1-9][0-9]{0,2}|1000)$")]]
    });

    this.ingredient$.subscribe(data => {
      this.ingredient = data || new Ingredient()
      if (this.ingredient.name == "") { this.new = true }
      this.ingredientForm.get('name')?.setValue(this.ingredient.name)
      this.ingredientForm.get('unit')?.setValue(this.ingredient.unit)
      this.ingredientForm.get('calory')?.setValue(this.ingredient.calory)
    })
  }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ingredientForm.patchValue({
        fileSource: file
      });
    }
  }

  showInfo(type1: string, type2: string): void {
    this.toastr.info(`Sikeresen ${type1} egy hozzávalót!`, `${type2}`, { timeOut: 3000 });
  }

  get f() {
    return this.ingredientForm.controls
  }

  onSubmit(ingredient: Ingredient) {

    this.submitted = true

    if (this.ingredientForm.invalid) {
      return
    }

    this.ingredient.name = this.ingredientForm.value['name']
    this.ingredient.unit = this.ingredientForm.value['unit']
    this.ingredient.calory = this.ingredientForm.value['calory']

    // const formData = new FormData()
    // formData.append('file', this.ingredientForm.value['fileSource'])
    if (ingredient._id === "") {
      this.ingredientService.create(ingredient)
      this.router.navigate(['dashboard/ingredients'])
      this.showInfo('létrehoztál', 'Létrehozva')
    } else {
      this.ingredientService.update(ingredient).subscribe(
        () => this.router.navigate(['dashboard/ingredients'])
      );
      this.showInfo('módosítottál', 'Módosítva');
    }

    // this.ingredientService.upload(formData);
  }
}
