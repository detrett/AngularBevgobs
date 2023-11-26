import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.fetchUserDetails(userId);
    } else {
      console.error('User ID not found in local storage');
    }
  }

  private fetchUserDetails(userId: string) {
    this.authService.getUserDetails(+userId).subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log('Current user:', this.currentUser);
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
