import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
 private rolesAPi: string = 'https://api.jsonbin.io/b/5eca9addbbaf1f2589463bbf';

  constructor(private http: HttpClient) { }

  public roles(): Observable<{roles: string[]}> {
    return this.http.get<{roles: string[]}>(this.rolesAPi);
  }
}
