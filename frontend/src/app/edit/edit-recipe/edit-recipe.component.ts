import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/model/recipe';
import { RecipeService } from 'src/app/service/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  recipeForm: FormGroup;

  recipe$: Observable<Recipe> = this.activatedRoute.params.pipe(
    switchMap(params => this.recipeService.get(params.id))
  );

  recipe: Recipe = new Recipe()
  new: boolean = false
  submitted: boolean = false

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      price_friendly: ['', Validators.required],
      time_pre: ['', [Validators.required, Validators.pattern("^([1-9][0-9]{0,2}|1000)$")]],
      time_cooking: ['', [Validators.pattern("^([0-9][0-9]{0,2}|1000)$")]],
      degree: [''],
      index: [''],
      calory: [''],
      portion: [''],
      story: [''],
      img: [''],
      fileSource: [''],
      ingrArray: this.fb.array([]),
      stepsArray: this.fb.array([])
    });
    this.ingrArray().push(this.newIngrGroup());
    this.stepsArray().push(this.newStepGroup());
    this.recipe$.subscribe(data => {
      this.recipe = data || new Recipe()
      if (this.recipe.name == "") { this.new = true }
      this.recipeForm.get('name')?.setValue(this.recipe.name)
      this.recipeForm.get('category')?.setValue(this.recipe.category)
      this.recipeForm.get('difficulty')?.setValue(this.recipe.difficulty)
      this.recipeForm.get('price_friendly')?.setValue(this.recipe.price_friendly)
      this.recipeForm.get('time_pre')?.setValue(this.recipe.time_pre)
      this.recipeForm.get('time_cooking')?.setValue(this.recipe.time_cooking)
      this.recipeForm.get('degree')?.setValue(this.recipe.degree)
      this.recipeForm.get('index')?.setValue(this.recipe.index)
      this.recipeForm.get('calory')?.setValue(this.recipe.calory)
      this.recipeForm.get('portion')?.setValue(this.recipe.portion)
      this.recipeForm.get('story')?.setValue(this.recipe.story)
      this.recipeForm.get('img')?.setValue(this.recipe.img)
      for (let i = 0; i < this.recipe.ingredients.length - 1; i++) {
        this.ingrArray().push(this.newIngrGroup())
      }
      const ingControlArray = <FormArray>this.recipeForm.get('ingrArray');
      for (let i = 0; i < this.recipe.ingredients.length; i++) {
        ingControlArray.controls[i].get('hozzavalo')?.setValue(this.recipe.ingredients[i]);
        ingControlArray.controls[i].get('egyseg')?.setValue(this.recipe.ingredients_unit[i]);
        ingControlArray.controls[i].get('mennyiseg')?.setValue(this.recipe.ingredients_quantity[i]);
      }
      for (let i = 0; i < this.recipe.description.length - 1; i++) {
        this.stepsArray().push(this.newStepGroup())
      }
      const stepControlArray = <FormArray>this.recipeForm.get('stepsArray');
      for (let i = 0; i < this.recipe.description.length; i++) {
        stepControlArray.controls[i].get('lepes')?.setValue(this.recipe.description[i]);
      }
    })
  }

  ngOnInit(): void {
  }

  ingrArray(): FormArray {
    return this.recipeForm.get("ingrArray") as FormArray
  }
  stepsArray(): FormArray {
    return this.recipeForm.get("stepsArray") as FormArray
  }

  newIngrGroup(): FormGroup {
    return this.fb.group({
      mennyiseg: ['', Validators.required],
      egyseg: ['', Validators.required],
      hozzavalo: ['', Validators.required],
    })
  }
  newStepGroup(): FormGroup {
    return this.fb.group({
      lepes: ['', Validators.required],
    })
  }

  addIngredient() {
    this.ingrArray().push(this.newIngrGroup());
  }
  addStep() {
    this.stepsArray().push(this.newStepGroup());
  }

  removeIngredient(i: number) {
    this.ingrArray().removeAt(i);
  }
  removeStep(i: number) {
    this.stepsArray().removeAt(i);
  }

  changeCategory(e: any) {
    this.recipeForm.get('category')?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.recipeForm.patchValue({
        fileSource: file
      });
    }
  }

  showInfo(type1: string, type2: string): void {
    this.toastr.info(`Sikeresen ${type1} egy receptet!`, `${type2}`, { timeOut: 3000 });
  }

  get f() {
    return this.recipeForm.controls
  }

  onSubmit(recipe: Recipe) {

    this.submitted = true

    if (this.recipeForm.invalid) {
      return
    }

    this.recipe.name = this.recipeForm.value['name']
    this.recipe.category = this.recipeForm.value['category']
    this.recipe.difficulty = this.recipeForm.value['difficulty']
    this.recipe.price_friendly = this.recipeForm.value['price_friendly']
    this.recipe.time_pre = this.recipeForm.value['time_pre']
    this.recipe.time_cooking = this.recipeForm.value['time_cooking']
    this.recipe.degree = this.recipeForm.value['degree']
    this.recipe.index = this.recipeForm.value['index']
    this.recipe.calory = this.recipeForm.value['calory']
    this.recipe.portion = this.recipeForm.value['portion']
    this.recipe.story = this.recipeForm.value['story']
    this.recipe.img = this.recipeForm.value['img']

    this.recipe.time_need = this.recipe.time_pre + this.recipe.time_cooking
    this.recipeForm.value['ingrArray'].forEach((item: any, index: number) => {
      this.recipe.ingredients_quantity[index] = item['mennyiseg']
    })
    this.recipeForm.value['ingrArray'].forEach((item: any, index: number) => {
      this.recipe.ingredients_unit[index] = item['egyseg']
    })
    this.recipeForm.value['ingrArray'].forEach((item: any, index: number) => {
      this.recipe.ingredients[index] = item['hozzavalo']
    })
    this.recipeForm.value['stepsArray'].forEach((item: any, index: number) => {
      this.recipe.description[index] = item['lepes']
    })
    // const formData = new FormData()
    // const file = this.recipeForm.value['fileSource']
    // formData.append('file', file, file.name)

    if (recipe._id === "") {
      this.recipeService.create(recipe)
      this.router.navigate(['dashboard/recipes'])
      this.showInfo('létrehoztál', 'Létrehozva')
    } else {
      this.recipeService.update(recipe).subscribe(
        () => this.router.navigate(['dashboard/recipes'])
      );
      this.showInfo('módosítottál', 'Módosítva');
    }

    // this.recipeService.upload(formData);
  }

}
