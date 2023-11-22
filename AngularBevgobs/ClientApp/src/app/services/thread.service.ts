// Import necessary modules and dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thread } from 'src/Models/Thread';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private apiUrl = 'http://your-api-url/threads'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  // Create a new thread
  createThread(thread: Thread): Observable<Thread> {
    return this.http.post<Thread>(this.apiUrl, thread);
  }

  // Get a thread by its ID
  getThreadById(threadId: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.apiUrl}/${threadId}`);
  }

  // Update an existing thread
  updateThread(thread: Thread): Observable<Thread> {
    return this.http.put<Thread>(`${this.apiUrl}/${thread.threadId}`, thread);
  }

  // Delete a thread by its ID
  deleteThread(threadId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${threadId}`);
  }
  getAllThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(this.apiUrl);
  }
}
