import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges, Input } from '@angular/core';
import { AuthService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../comment/comment.service';
declare var bootstrap: any;

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit, OnChanges {
  currentUser: any = null;
  commentContent: string = '';
  previewContent: string = 'Nothing to preview.';
  commentForm: FormGroup;
  @Input() threadId?: number;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _commentService: CommentService,
    private authService: AuthService) {
    this.commentForm = _formbuilder.group({
      Title: [''],
      Body: ['', Validators.required],
      ThreadId: [''],
      UserId: [''],
      CreatedAt: [new Date()],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("New Thread Form Component: ngOnChanges()");
    if (changes.threadId && changes.threadId.currentValue !== undefined) {
      this.commentForm.patchValue({ ThreadId: this.threadId });
    }
  }

  commentPreview() {
    console.log("Comment Box Component: commentPreview()");
    console.log("Data: " + this.commentContent);

    if (this.commentContent.trim().length === 0) {
      this.previewContent = 'Nothing to preview.';
    } else {
      this.previewContent = this.commentContent;
    }
  }

  ngOnInit(): void {
    console.log("Comment Box Component: ngOnInit()");

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Current user:', this.currentUser);
          this.commentForm.patchValue({ UserId: userId });
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }

  getFormattedDate(): string {

    console.log("Comment Box Component: getFormattedDate()");
    const now = new Date();
    return `on ${now.toLocaleDateString('en-UK', { day: 'numeric', month: 'long' })}`;

  }

  get authorJoinDate() {
    if (!this.currentUser?.CreatedAt) {
      return "Undefined date"
    } else {
      const date = new Date(this.currentUser?.CreatedAt);
      return date.toLocaleDateString('en-UK', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    console.log("New Comment form submitted:");
    console.log(this.commentForm);
    const newComment = this.commentForm.value;

    this._commentService.createComment(newComment)
      .subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this.commentForm.reset();
          window.location.reload();
        }
        else {
          console.log('Comment creation failed');
        }
      });


  }
}
