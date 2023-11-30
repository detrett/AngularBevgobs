import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'api/user';
  constructor(private _http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    console.log("User Service: getUsers()");
    return this._http.get<IUser[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<IUser> {
    console.log("User Service: getUserById(), id: " + id);
    return this._http.get<IUser>(this.apiUrl + `/${id}`)
  }
}
