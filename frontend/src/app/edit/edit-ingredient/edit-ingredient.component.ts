import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.ingredientForm = this.fb.group({
      name: [''],
      unit: [''],
      calory: ['']
    });

    this.ingredient$.subscribe(data => {
      this.ingredient = data || new Ingredient()
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

  showInfo(type: string): void {
    this.toastr.info(`You have successfully ${type} an ingredient!`, `${type}`, { timeOut: 3000 });
  }

  onSubmit(ingredient: Ingredient) {

    this.ingredient.name = this.ingredientForm.value['name']
    this.ingredient.unit = this.ingredientForm.value['unit']
    this.ingredient.calory = this.ingredientForm.value['calory']

    const formData = new FormData()
    formData.append('file', this.ingredientForm.value['fileSource'])
    if (ingredient._id === "") {
      this.ingredientService.create(ingredient)
      this.router.navigate(['dashboard/ingredients'])
      this.showInfo('created')
    } else {
      this.ingredientService.update(ingredient).subscribe(
        () => this.router.navigate(['dashboard/ingredients'])
      );
      this.showInfo('updated');
    }

    this.ingredientService.upload(formData);
  }
}
