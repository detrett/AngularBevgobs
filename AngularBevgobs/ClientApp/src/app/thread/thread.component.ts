import { Component, OnInit, Input } from '@angular/core';
import { IThread } from './thread';
import { IComment } from '../comment/comment';
import { Router } from '@angular/router';
import { ThreadService } from './thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent implements OnInit {
  @Input() thread?: IThread;
  lastComment?: IComment;

  constructor(
    private _router: Router,
    private _subforumService: ThreadService) { }

  findLastComment(): void {
    console.log("Thread Component: findLastComment()");

    if (this.thread?.Comments && (this.thread?.Comments.length > 0))
    {
      let tempLastComment = this.thread.Comments[this.thread.Comments.length - 1];

      if (tempLastComment)
      {
        if (!this.lastComment || this.lastComment.CreatedAt > tempLastComment.CreatedAt) {
          this.lastComment = tempLastComment;
        }
      }

    }

    console.log("Last comment ID: " + this.lastComment?.CommentId);
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
      return `on ${createdDate.toLocaleDateString()}`;
    }
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
}
