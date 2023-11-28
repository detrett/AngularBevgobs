import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IComment } from '../comment/comment';
import { IUser } from '../user/user';
import { Router } from '@angular/router';
import { CommentService } from '../comment/comment.service';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/app/services/authentication.service';
declare var bootstrap: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit, AfterViewInit {
  @Input() comment?: IComment;
  author?: IUser;

  currentUser: any = null;

  constructor(
    private _router: Router,
    private _commentService: CommentService,
    private _userService: UserService,
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
      return `on ${createdDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}`;
    }
  }

  get authorJoinDate() {
    return this.author?.CreatedAt.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
  }

  ngOnInit(): void {
    console.log("Comment Component: ngOnInit()");

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
