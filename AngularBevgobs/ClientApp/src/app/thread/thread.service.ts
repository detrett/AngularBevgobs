import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IThread } from './thread';

@Injectable({
  providedIn: 'root'
})

export class ThreadService {
  private apiUrl = 'api/thread';
  constructor(private _http: HttpClient) { }

  getThreads(): Observable<IThread[]> {
    console.log("Thread Service: getSubforums()");
    return this._http.get<IThread[]>(this.apiUrl);
  }

  getThreadById(id: number): Observable<IThread> {
    console.log("Thread Service: getThreadById(), id: " + id);
    return this._http.get<IThread>(this.apiUrl + `/${id}`)
  }
}
