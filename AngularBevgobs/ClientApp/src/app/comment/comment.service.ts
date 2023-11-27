import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from './comment';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private apiUrl = 'api/comment';
  constructor(private _http: HttpClient) { }

  getComments(): Observable<IComment[]> {
    console.log("Comment Service: getComments()");
    return this._http.get<IComment[]>(this.apiUrl);
  }

  getCommentById(id: number): Observable<IComment> {
    console.log("Comment Service: getCommentById(), id: " + id);
    return this._http.get<IComment>(this.apiUrl + `/${id}`)
  }
}
