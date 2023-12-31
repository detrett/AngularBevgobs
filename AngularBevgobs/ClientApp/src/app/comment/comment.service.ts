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

  createComment(newComment: IComment): Observable<any> {
    const createUrl = 'api/comment/create';
    return this._http.post<any>(createUrl, newComment);
  }

  deleteComment(id: number): Observable<any> {
    return this._http.delete<any>(this.apiUrl + `/delete/${id}`);
  }

  updateComment(id: number, newComment: any): Observable<any> {
    const url = `${this.apiUrl}/update/${id}`;
    newComment.CommentId = id;
    return this._http.put<any>(url, newComment);
  }
}
