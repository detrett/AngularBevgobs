  import { Component } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    username: string = '';
    password: string = '';

    constructor(private router: Router) {}

    onSubmit() {
      // Here, you would typically send a POST request to your authentication API
      // to verify the username and password.
      // If authentication is successful, you would receive an access token.

      // For demonstration purposes, we'll simulate a successful login.
      // In a real application, you should replace this with an HTTP request.
      const fakeAccessToken = 'your-access-token';

      // Store the access token in local storage or a cookie for future requests.
      localStorage.setItem('access_token', fakeAccessToken);

      // Redirect to a protected route (e.g., dashboard) upon successful login.
      this.router.navigate(['/dashboard']);
    }
  }
