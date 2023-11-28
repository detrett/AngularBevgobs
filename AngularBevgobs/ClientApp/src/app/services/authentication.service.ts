import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5186/api/authenticate';
  private userBaseUrl = 'http://localhost:5186/api/user';
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (response && response.userId) {
          localStorage.setItem('userId', response.userId.toString());
          console.log('UserId stored in localStorage:', response.userId);
        } else {
          console.error('Login response does not contain userId');
        }
      })
    );
  }


  register(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerData).pipe(
      tap(response => {
      }, error => {
        console.error('Registration error:', error);
      })
    );
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>('/api/user/check-username', { params: { username } });
  }

  getUserDetails(userId: number): Observable<any> {
    return this.http.get<any>(`${this.userBaseUrl}/${userId}`);
  }

  // Store authentication token
  storeAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  updateUserDetails(userId: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.userBaseUrl}/update/${userId}`, formData);
  }

}
