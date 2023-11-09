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

  getForums(): Observable<ISubforum[]> {
    return this._http.get<ISubforum[]>(this.apiUrl);
  }
}
