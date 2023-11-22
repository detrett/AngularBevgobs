import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const registrationData = { email: this.email, password: this.password };
    this.http.post('/api/register', registrationData).subscribe(
      (response) => {
        // Handle successful registration, e.g., show a success message or redirect.
      },
      (error) => {
        // Handle registration error, e.g., display an error message.
      }
    );
  }
}
