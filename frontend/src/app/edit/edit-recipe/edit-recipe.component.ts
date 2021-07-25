import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.recipeForm = this.fb.group({
      name: [''],
      category: [''],
      difficulty: [''],
      price_friendly: [''],
      time_pre: [''],
      time_cooking: [''],
      degree: [''],
      index: [''],
      calory: [''],
      portion: [''],
      story: [''],
      file: [''],
      fileSource: [''],
      ingrArray: this.fb.array([]),
      stepsArray: this.fb.array([])
    });
    this.ingrArray().push(this.newIngrGroup());
    this.stepsArray().push(this.newStepGroup());
    this.recipe$.subscribe(data => {
      this.recipe = data || new Recipe()
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
      mennyiseg: [''],
      egyseg: [''],
      hozzavalo: [''],
    })
  }
  newStepGroup(): FormGroup {
    return this.fb.group({
      lepes: [''],
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
    this.recipeForm.value['category'].setValue(e.target.value, {
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

  showInfo(type: string): void {
    this.toastr.info(`You have successfully ${type}  a recipe!`, `${type}`, { timeOut: 3000 });
  }

  onSubmit(recipe: Recipe) {
    // this.recipe.ingredients[0] = this.productForm.value['ingrArray'][0]['hozzavalo']
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
    const formData = new FormData()
    formData.append('file', this.recipeForm.value['fileSource'])
    if (recipe._id === "") {
      this.recipeService.create(recipe)
      this.router.navigate(['dashboard/recipes'])
      this.showInfo('created')
    } else {
      this.recipeService.update(recipe).subscribe(
        () => this.router.navigate(['dashboard/recipes'])
      );
      this.showInfo('updated');
    }


    this.recipeService.upload(formData);
  }

}
