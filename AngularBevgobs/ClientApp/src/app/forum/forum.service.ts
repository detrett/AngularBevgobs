import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IForum } from './forum';

@Injectable({
  providedIn: 'root'
})

export class ForumService {
  private apiUrl = 'api/forums';
  constructor(private _http: HttpClient) { }

  getForums(): Observable<IForum[]> {
    return this._http.get<IForum[]>(this.apiUrl);
  }
}
