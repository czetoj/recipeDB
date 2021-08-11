import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Recipe } from 'src/app/model/recipe';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RecipeService {

  list$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  apiUrl: string = 'http://localhost:3000/recipes'

  constructor(
    public http: HttpClient
  ) {
    this.getAll();
  }

  getAll(): void {
    this.http.get<Recipe[]>(this.apiUrl).subscribe(recipes => this.list$.next(recipes));
  }

  get(id: string): Observable<Recipe> {
    const recipe: Recipe | undefined = this.list$.value.find(item => item._id === id);
    if (recipe) {
      return of(recipe);
    }

    return of(new Recipe());
  }

  getCategory(category: string): Observable<Recipe[]> {
    const recipes: Recipe[] | undefined = this.list$.value.filter(item => item.category === category);
    if (recipes) {
      return of(recipes)
    }
    return of([])
  }

  update(recipe: Recipe): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.apiUrl}/${recipe._id}`, recipe)
  }

  create(recipe: Recipe): void {
    this.http.post<Recipe>(this.apiUrl, recipe).subscribe(() => this.getAll())
  }

  remove(recipe: Recipe): void {
    this.http.delete(`${this.apiUrl}/${recipe._id}`).subscribe(() => this.getAll())
  }

  upload(formData: FormData): void {
    this.http.post('http://localhost:3000/upload', formData).subscribe(res => {
      console.log(res);
      alert('Sikeres file feltöltés')
    })
  }
}
