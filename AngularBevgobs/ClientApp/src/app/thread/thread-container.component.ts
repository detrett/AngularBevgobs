import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IThread } from './thread';
import { IUser } from '../user/user';
import { ThreadService } from './thread.service';
import { AuthService } from 'src/app/services/authentication.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})

export class ThreadContainerComponent implements OnInit {
  thread: IThread | null = null;
  author?: IUser;

  currentUser: any = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _threadService: ThreadService,
    private _userService: UserService,
    private authService: AuthService) { }

  getAuthor(): void {
    console.log("Thread Container Component: getAuthor()");

    if (this.thread?.UserId != null) {
      this._userService.getUserById(this.thread?.UserId)
        .subscribe(data => {
          console.log('Data received: ', JSON.stringify(data));
          this.author = data;
        })
    }
  }

  getThreadData(id: number): void {
    console.log("Thread Container Component: getThreadData()");
    this._threadService.getThreadById(+id).subscribe(
      data => {
        this.thread = data;
        console.log("Thread Name: " + this.thread?.Name);
        console.log("Total Comments: " + this.thread?.Comments.length);
      },
      error => {
        console.error('Error fetching subforum:', error);
        this._router.navigate(['/']);
      }
    );
  }

  ngOnInit(): void {
    console.log("Thread Container Component: ngOnInit()");

    this._route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id != null) {
        this.getThreadData(+id);
      } else {
        console.error('Error fetching id');
        this._router.navigate(['/']);
      }
    });

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Current user:', this.currentUser);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }

    this.getAuthor();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAuthorOrMod(): boolean {
    if (this.author?.Rank == "Admin" || this.author?.Rank == "Mod" || this.currentUser == this.author?.Username) {
      return true;
    } else return false;
  }

  logout() {
    this.authService.logout();
  }
}
