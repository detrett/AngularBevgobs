import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      (data) => {
        if (data && data.token) {
          console.log('Login successful', data);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/']);
        } else {
          console.error('Login failed: Invalid response from the server');
        }
      },
      (error) => {
        console.error('Login failed', error);

        if (error.status === 400) {
          const errorResponse = error.error;
          if (errorResponse && errorResponse.message) {
            console.error('Bad Request:', errorResponse.message);
            this.errorMessage = errorResponse.message;
          } else {
            console.error('Bad Request: Invalid email or password');
            this.errorMessage = 'An unexpected error occurred. Please try again later';
          }
        } else {
          console.error('Invalid email or password.');
          this.errorMessage = 'Invalid email or password';
        }
      }
    );
  }
}

