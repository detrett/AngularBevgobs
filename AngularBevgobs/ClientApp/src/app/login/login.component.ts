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
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (data) => {
        console.log('Login response:', data);
        if (data && data.token) {
          this.authService.storeAuthToken(data.token);
          if (data.userId) {
            localStorage.setItem('userId', data.userId.toString());
          } else {
            console.error('Login response does not contain userId');
          }
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Login failed: Invalid response from the server';
        }
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }


  private handleError(error: any) {
    if (error.status === 400) {
      const errorResponse = error.error;
      if (errorResponse && errorResponse.message) {
        this.errorMessage = errorResponse.message;
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later';
      }
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
