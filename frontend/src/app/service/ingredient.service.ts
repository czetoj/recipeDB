import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Ingredient } from '../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  list$: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);
  apiUrl: string = 'http://localhost:3000/ingredients'

  constructor(
    public http: HttpClient
  ) {
    this.getAll();
  }

  getAll(): void {
    this.http.get<Ingredient[]>(this.apiUrl).subscribe(ingredients => this.list$.next(ingredients));
  }

  get(id: string): Observable<Ingredient> {
    const ingredient: Ingredient | undefined = this.list$.value.find(item => item._id === id);
    if (ingredient) {
      return of(ingredient);
    }

    return of(new Ingredient());
  }

  update(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.patch<Ingredient>(`${this.apiUrl}/${ingredient._id}`, ingredient)
  }

  create(ingredient: Ingredient): void {
    this.http.post<Ingredient>(this.apiUrl, ingredient).subscribe(() => this.getAll())
  }

  remove(ingredient: Ingredient): void {
    this.http.delete(`${this.apiUrl}/${ingredient._id}`).subscribe(() => this.getAll())
  }

  upload(formData: FormData): void {
    this.http.post('http://localhost:3000/upload', formData).subscribe(res => {
      console.log(res);
      alert('Sikeres file feltöltés')
    })
  }
}
