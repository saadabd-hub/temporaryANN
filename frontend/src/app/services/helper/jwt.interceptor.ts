import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';

let TOKEN_HEADER_KEY = 'access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private token:TokenStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        let authReq = req;
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && this.token.getToken();
        const isApiUrl = request.url.startsWith(environment.urlAddress);
        if (isLoggedIn && isApiUrl != null) {
            authReq = req.clone({
                headers:req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
            });
        }
        return next.handle(authReq);
    }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
