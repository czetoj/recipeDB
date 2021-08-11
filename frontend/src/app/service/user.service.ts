import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // apiUrl = `${this.config.apiUrl}users`
  entity = 'users'

  constructor(
    public http: HttpClient,
    private config: ConfigService
  ) {
    // this.getAll();
  }

  // getAll(): void {
  //   this.http.get<User[]>(this.apiUrl).subscribe(users => this.list$.next(users));
  // }

  // get(id: string): Observable<User> {
  //   const user: User | undefined = this.list$.value.find(item => item._id === id);
  //   if (user) {
  //     return of(user);
  //   }
  //   return of(new User());
  // }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.apiUrl}${this.entity}`);
  }

  get(id?: string | number): Observable<User> {
    let url = `${this.config.apiUrl}${this.entity}`;
    if (id) {
      url += `/${id}`;
    }

    return this.http.get<User>(url);
  }

  query(queryString: string): Observable<User | User[]> {
    const url = `${this.config.apiUrl}${this.entity}?${queryString}`
    return this.http.get<User[]>(url)
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.config.apiUrl}${this.entity}/${user._id}`, user)
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.config.apiUrl}${this.entity}`, user)
  }

  remove(user: User): Observable<User> {
    return this.http.delete<User>(`${this.config.apiUrl}${this.entity}/${user._id}`)
  }

  upload(formData: FormData): void {
    this.http.post('http://localhost:3000/upload', formData).subscribe(res => {
      console.log(res);
      alert('Sikeres file feltöltés')
    })
  }
}
