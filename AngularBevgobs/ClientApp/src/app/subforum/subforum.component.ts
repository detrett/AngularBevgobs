import { Component, OnInit, Input } from '@angular/core';
import { ISubforum } from './subforum';
import { IComment } from '../comment/comment';
import { Router } from '@angular/router';
import { SubforumService } from './subforum.service';

@Component({
  selector: 'app-subforum',
  templateUrl: './subforum.component.html',
  styleUrls: ['./subforum.component.css']
})

export class SubforumComponent implements OnInit {
  @Input() subforum?: ISubforum;
  @Input() isLast?: boolean = false;
  lastComment?: IComment;

  constructor(
    private _router: Router,
    private _subforumService: SubforumService) { }

  findLastComment(): void {
    console.log("Subforum Component: findLastComment()");
    this.subforum?.Threads.forEach(thread => {
      if (thread.Comments && thread.Comments.length > 0) {
        let tempLastComment = thread.Comments[thread.Comments.length - 1];

        if (tempLastComment) {
          if (!this.lastComment || this.lastComment.CreatedAt > tempLastComment.CreatedAt) {
            this.lastComment = tempLastComment;
          }
        }
      }
    });

    console.log("Last comment ID: " + this.lastComment?.CommentId);
  }

  getFormattedDate(): string {

    console.log("Subforum Component: getFormattedDate()");
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

  setClasses() {
    return {
      backgroundDark: this.subforum?.BackgroundColor == "background-dark",
      backgroundLight: this.subforum?.BackgroundColor == "background-light",
      roundBottom: this.isLast
    }
  }

  ngOnInit(): void {
    console.log("Subforum Component: ngOnInit()");
    console.log("Subforum Name: " + this.subforum?.Name);

    this.findLastComment();
  }
}

