import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IThread } from './thread';
import { IComment } from '../comment/comment';
import { IUser } from '../user/user';
import { Router } from '@angular/router';
import { ThreadService } from './thread.service';
import { UserService } from '../user/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit, AfterViewInit {
  @Input() thread?: IThread;
  @Input() isLast?: boolean = false;
  lastComment?: IComment;
  lastUser?: IUser;

  constructor(
    private _router: Router,
    private _subforumService: ThreadService,
    private _userService: UserService) { }

  ngAfterViewInit(): void {
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })       
  }

  findLastComment(): void {
    console.log("Thread Component: findLastComment()");

    if (this.thread?.Comments && (this.thread?.Comments.length > 0)) {
      let tempLastComment = this.thread.Comments[this.thread.Comments.length - 1];

      if (tempLastComment) {
        if (!this.lastComment || this.lastComment.CreatedAt > tempLastComment.CreatedAt) {
          this.lastComment = tempLastComment;
        }
      }

    }

    console.log("Last comment ID: " + this.lastComment?.CommentId);
    if (this.lastComment?.UserId != null) {
      this.getLastUser(this.lastComment?.UserId);
    }
  }

  getAuthor(): string {
    console.log("Thread Component: getAuthor()");

    let tempAuthorName = "Unkown";

    if (this.thread?.UserId != null) {
      this._userService.getUserById(this.thread?.UserId)
        .subscribe(data => {
          console.log('Data received: ', JSON.stringify(data));
          tempAuthorName = data.Username;
        })
    }

    return tempAuthorName;

  }

  getFormattedDate(): string {

    console.log("Thread Component: getFormattedDate()");
    console.log("Last comment ID: " + this.lastComment?.CreatedAt);

    if (!this.lastComment?.CreatedAt) {
      return "Undefined date"
    } else {
      const createdDate = new Date(this.lastComment.CreatedAt);

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

  getLastUser(id: number): void {
    console.log("Thread Component: getLastUser()")

    this._userService.getUserById(id)
      .subscribe(data => {
        console.log('Data received: ', JSON.stringify(data));
        this.lastUser = data;
      })
  }

  hasComments(): boolean {
    if (this.thread?.Comments != null) {
      return this.thread?.Comments?.length > 0;
    }
    else return false;
  }

  ngOnInit(): void {
    console.log("Thread Component: ngOnInit()");
    console.log("Thread Name: " + this.thread?.Name);

    this.findLastComment();
  }

  setClasses() {
    return {
      roundBottom: this.isLast
    }
  }
}
