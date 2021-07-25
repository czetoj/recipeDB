import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  list$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  apiUrl: string = 'http://localhost:3000/messages'

  constructor(
    public http: HttpClient
  ) {
    this.getAll();
  }

  getAll(): void {
    this.http.get<Message[]>(this.apiUrl).subscribe(messages => this.list$.next(messages));
  }

  get(id: string): Observable<Message> {
    const message: Message | undefined = this.list$.value.find(item => item._id === id);
    if (message) {
      return of(message);
    }

    return of(new Message());
  }

  update(message: Message): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/${message._id}`, message)
  }

  create(message: Message): void {
    this.http.post<Message>(this.apiUrl, message).subscribe(() => this.getAll())
  }

  remove(message: Message): void {
    this.http.delete(`${this.apiUrl}/${message._id}`).subscribe(() => this.getAll())
  }

  upload(formData: FormData): void {
    this.http.post('http://localhost:3000/upload', formData).subscribe(res => {
      console.log(res);
      alert('Sikeres file feltöltés')
    })
  }
}
