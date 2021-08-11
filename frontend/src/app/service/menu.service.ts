import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Menu } from '../model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  list$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  apiUrl: string = 'http://localhost:3000/menus'

  constructor(public http: HttpClient) {
    this.getAll();
  }

  getAll(): void {
    this.http.get<Menu[]>(this.apiUrl).subscribe(menus => this.list$.next(menus));
  }

  get(id: string): Observable<Menu> {
    const menu: Menu | undefined = this.list$.value.find(item => item._id === id);
    if (menu) {
      return of(menu);
    }

    return of(new Menu());
  }

  update(menu: Menu): Observable<Menu> {
    return this.http.patch<Menu>(`${this.apiUrl}/${menu._id}`, menu)
  }

  create(menu: Menu): void {
    this.http.post<Menu>(this.apiUrl, menu).subscribe(() => this.getAll())
  }

  remove(menu: Menu): void {
    this.http.delete(`${this.apiUrl}/${menu._id}`).subscribe(() => this.getAll())
  }

  upload(formData: FormData): void {
    this.http.post('http://localhost:3000/upload', formData).subscribe(res => {
      console.log(res);
      alert('Sikeres file feltöltés')
    })
  }
}
