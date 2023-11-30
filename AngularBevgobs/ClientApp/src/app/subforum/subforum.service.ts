import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubforum } from './subforum';

@Injectable({
  providedIn: 'root'
})

export class SubforumService {
  private apiUrl = 'api/subforum';
  constructor(private _http: HttpClient) { }

  getSubforums(): Observable<ISubforum[]> {
    console.log("Subforum Service: getSubforums()");
    return this._http.get<ISubforum[]>(this.apiUrl);
  }

  getSubforumById(id: number): Observable<ISubforum> {
    console.log("Subforum Service: getSubforumById(), id: " + id);
    return this._http.get<ISubforum>(this.apiUrl + `/${id}`)
  }
}
