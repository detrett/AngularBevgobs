import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { IComment } from '../comment/comment';
import { IUser } from '../user/user';
import { IThread } from '../thread/thread';
import { Router } from '@angular/router';
import { CommentService } from '../comment/comment.service';
import { UserService } from '../user/user.service';
import { ThreadService } from '../thread/thread.service';
import { AuthService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  isEditing: boolean = false;

  previousComment: string = '';
  editingContent: string = '';

  currentUser: any = null;

  commentForm: FormGroup;

  constructor(
    private _router: Router,
    private _formbuilder: FormBuilder,
    private _commentService: CommentService,
    private _userService: UserService,
    private _threadService: ThreadService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService) {
    this.commentForm = _formbuilder.group({
      Title: [''],
      Body: ['', Validators.required],
      ThreadId: [''],
      UserId: [''],
      CreatedAt: [new Date()],
    });
  }

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
      return "Undefined date";
    } else {
      const createdDate = new Date(this.comment.CreatedAt);
      const now = new Date();
      const ts = now.getTime() - createdDate.getTime();
      const minutes = Math.floor(ts / 60000);
      const hours = Math.floor(ts / 3600000);
      const days = Math.floor(ts / (3600000 * 24));

      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes} minutes ago`;
      if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
      if (days === 1) return 'Yesterday';
      if (days < 5) return `${days} days ago`;
      return createdDate.toLocaleDateString('en-UK', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }



  get authorJoinDate() {
    if (!this.author?.CreatedAt) {
      return "Undefined date"
    } else {
      const date = new Date(this.author?.CreatedAt);
      return date.toLocaleDateString('en-UK', { day: 'numeric', month: 'short', year: 'numeric' });
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

  editComment(btn_id: number | undefined) {
    console.log("Comment Component: editComment()");
    if (this.comment?.Body != null && btn_id != undefined && this.comment?.CommentId != null) {
      this.previousComment = this.comment.Body;
      this.editingContent = this.comment.Body; // Temporary variable for editing
      this.isEditing = true;
      this.commentForm.patchValue({
        Title: this.comment?.Title,
        Body: this.comment?.Body,
        ThreadId: this.comment?.ThreadId,
        UserId: this.comment?.UserId,
        CreatedAt: this.comment?.CreatedAt,
        CommentId: this.comment?.CommentId // Ensure the comment ID is in the form
      });

      setTimeout(() => {
        const commentBody = document.getElementById(`comment-editable-${btn_id}-body`);
        commentBody?.focus();
      }, 0);
    }
  }

  onSubmit() {
    console.log("Comment Component: onSubmit()");

    if (this.isEditing && this.comment?.CommentId != null) {
      var updatedComment = {
        CommentId: this.comment.CommentId,
        Title: this.commentForm.get('Title')?.value || this.comment.Title,
        Body: this.commentForm.get('Body')?.value,
        ThreadId: this.comment.ThreadId,
        UserId: this.comment.UserId,
        CreatedAt: this.comment.CreatedAt
      };

      this._commentService.updateComment(this.comment.CommentId, updatedComment)
        .subscribe(
          (response) => {
            if (response.success) {
              console.log(response.message);
              window.location.reload();
            }
          },
          (error) => {
            console.error('Error updating comment:', error);
          });
      this.isEditing = false;
    } else {
      console.error("No comment is being edited or comment ID is missing");
    }
  }


  cancelEditing() {
    console.log("Comment Component: cancelEditing()");
    if (this.comment) {
      this.comment.Body = this.previousComment; // Revert to the original value
      this.isEditing = false;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  ngOnInit(): void {
    console.log("Comment Component: ngOnInit()");
    if (this.comment?.Body != null) {
      this.editingContent = this.comment?.Body;
      this.cdr.detectChanges(); // Manually trigger change detection
    }

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
