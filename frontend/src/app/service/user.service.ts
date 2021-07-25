import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  list$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  apiUrl: string = 'http://localhost:3000/users'

  constructor(
    public http: HttpClient
  ) {
    this.getAll();
  }

  getAll(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(users => this.list$.next(users));
  }

  get(id: string): Observable<User> {
    const user: User | undefined = this.list$.value.find(item => item._id === id);
    if (user) {
      return of(user);
    }

    return of(new User());
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${user._id}`, user)
  }

  create(user: User): void {
    this.http.post<User>(this.apiUrl, user).subscribe(() => this.getAll())
  }

  remove(user: User): void {
    this.http.delete(`${this.apiUrl}/${user._id}`).subscribe(() => this.getAll())
  }

  upload(formData: FormData): void {
    this.http.post('http://localhost:3000/upload', formData).subscribe(res => {
      console.log(res);
      alert('Sikeres file feltöltés')
    })
  }
}
