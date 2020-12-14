import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getPublicContent(): Observable<any> {
        return this.http.get(`${environment.urlAddress}all`);
      }

      getUserBoard(): Observable<any> {
        return this.http.get(environment.urlAddress + 'user');
      }

      getModeratorBoard(): Observable<any> {
        return this.http.get(environment.urlAddress + 'mod');
      }

      getAdminBoard(): Observable<any> {
        return this.http.get(environment.urlAddress + 'admin');
      }

    getAll() {
        return this.http.get<User[]>(`${environment.urlAddress}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.urlAddress}/users/${id}`);
    }
}
