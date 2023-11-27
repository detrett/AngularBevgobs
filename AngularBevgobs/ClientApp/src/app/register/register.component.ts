import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { AuthService } from 'src/app/services/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required], [this.usernameValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchPassword });
  }

  matchPassword(group: FormGroup): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return { invalidForm: true };
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { notMatching: true };
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return this.authService.checkUsernameAvailability(control.value).pipe(
        debounceTime(500),
        map(isAvailable => (isAvailable ? null : { alreadyTaken: true })),
        catchError(() => of(null))
      );
    };
  }


  onRegister() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.authService.register(registerData).subscribe({
        next: (data) => {
          this.authService.login(registerData.email, registerData.password).subscribe({
            next: (loginData) => {
              if (loginData && loginData.token) {
                this.authService.storeAuthToken(loginData.token);
                localStorage.setItem('userId', loginData.userId.toString());
                this.router.navigate(['/']);
              }
            },
            error: (loginError) => console.error('Login failed after registration', loginError)
          });
        },
        error: (error) => {
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = 'Registration failed. Please try again later.';
          }
        }
      });
    }
  }


}
