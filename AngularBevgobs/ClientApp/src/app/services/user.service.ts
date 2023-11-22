import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApplicationUser } from 'src/Models/ApplicationUser'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://your-api-url/users'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<ApplicationUser> {
    return this.http.get<ApplicationUser>(`${this.apiUrl}/${id}`);
  }

  createUser(user: ApplicationUser): Observable<ApplicationUser> {
    return this.http.post<ApplicationUser>(this.apiUrl, user);
  }

  updateUser(user: ApplicationUser): Observable<ApplicationUser> {
    return this.http.put<ApplicationUser>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
