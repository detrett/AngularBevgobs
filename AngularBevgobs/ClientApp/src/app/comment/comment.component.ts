import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IComment } from '../comment/comment';
import { IUser } from '../user/user';
import { IThread } from '../thread/thread';
import { Router } from '@angular/router';
import { CommentService } from '../comment/comment.service';
import { UserService } from '../user/user.service';
import { ThreadService } from '../thread/thread.service';
import { AuthService } from 'src/app/services/authentication.service';
declare var bootstrap: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit, AfterViewInit {
  @Input() comment?: IComment;
  userDataLoaded: boolean = false;
  author?: IUser;
  thread?: IThread;

  currentUser: any = null;

  constructor(
    private _router: Router,
    private _commentService: CommentService,
    private _userService: UserService,
    private _threadService: ThreadService,
    private authService: AuthService) { }

  ngAfterViewInit(): void {
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  getAuthor(): void {
    console.log("Comment Component: getAuthor()");

    if (this.comment?.UserId != null) {
      this._userService.getUserById(this.comment?.UserId)
        .subscribe(data => {
          console.log('Data received: ', JSON.stringify(data));
          this.author = data;
          
        })
    }

  }

  getThread(): void {
    console.log("Comment Component: getThread()");

    if (this.comment?.ThreadId != null) {
      this._threadService.getThreadById(this.comment?.ThreadId)
        .subscribe(data => {
          console.log('Data received: ', JSON.stringify(data));
          this.thread = data;
        })
    }
  }

  getFormattedDate(): string {

    console.log("Comment Component: getFormattedDate()");
    console.log("Last comment ID: " + this.comment?.CreatedAt);

    if (!this.comment?.CreatedAt) {
      return "Undefined date"
    } else {
      const createdDate = new Date(this.comment?.CreatedAt);

      const now = new Date();
      const ts = now.getTime() - createdDate.getTime();
      const minutes = Math.floor(ts / 60000);
      const hours = Math.floor(ts / 3600000);
      const days = Math.floor(ts / (3600000 * 24));

      if (minutes < 2) return '1 minute ago';
      if (hours < 1) return `${minutes} minutes ago`;
      if (days < 1) return hours >= 2 ? `${hours} hours ago` : '1 hour ago';
      if (days < 2) return 'yesterday';
      if (days < 5) return `on ${createdDate.getDay()}`;
      return `on ${createdDate.toLocaleDateString('en-UK', { day: 'numeric', month: 'long' })}`;
    }
  }

  get authorJoinDate() {
    if (!this.author?.CreatedAt) {
      return "Undefined date"
    } else {
      const date = new Date(this.author?.CreatedAt);
      return date.toLocaleDateString('en-UK', { day: 'numeric', month: 'short', year:'numeric' });
    }
  }

  get commentTitle() {
    console.log("Comment Component: commentTitle()");
    if (this.comment?.Title != null) {
      return this.comment?.Title;
    } else return this.thread?.Name;
  }

  deleteComment(id: number | undefined) {
    console.log("Comment Component: deleteComment()");

    if (id != undefined) {
      this._commentService.deleteComment(id)
        .subscribe(
          (response) => {
            if (response.success) {
              console.log(response.message);
              window.location.reload();
            }
          },
          (error) => {
            console.error('Error deleting item:', error);
          });
    }
  }

  ngOnInit(): void {
    console.log("Comment Component: ngOnInit()");

    this.getAuthor();
    this.getThread();

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Current user:', this.currentUser);
          this.userDataLoaded = true;
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
    
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAuthorOrMod(): boolean {
    console.log("Current user: " + this.currentUser)
    if (this.author?.Rank == "Admin" || this.author?.Rank == "Mod" || this.currentUser.Username == this.author?.Username) {
      return true;
    } else return false;
  }

  logout() {
    this.authService.logout();
  }
}
