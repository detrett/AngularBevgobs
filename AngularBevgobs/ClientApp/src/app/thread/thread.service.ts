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
}
