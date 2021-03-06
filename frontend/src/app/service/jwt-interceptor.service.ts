import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    // private injector: Injector
  ) { }

  // auth = this.injector.get(AuthService)

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const currentUser = this.auth.currentUserValue
    const currentToken = this.auth.lastToken;

    if (currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`
        }
      })
    }
    return next.handle(request)
  }
}
