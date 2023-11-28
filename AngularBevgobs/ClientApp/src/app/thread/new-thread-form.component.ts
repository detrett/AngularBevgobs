import { Component, OnInit, OnChanges, Input, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from './thread.service';
import { SubforumService } from '../subforum/subforum.service';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/app/services/authentication.service';
import { ISubforum } from "../subforum/subforum";
import { IUser } from "../user/user";

@Component({
  selector: "app-new-thread-form",
  templateUrl: "./new-thread-form.component.html",
  styleUrls: ['./new-thread-form.component.css']
})
export class NewThreadFormComponent implements OnInit, OnChanges {
  threadForm: FormGroup;
  threadId: number = -1;
  parentSubforum: ISubforum | undefined;
  @Input() subforumId?: number;

  currentUser: any = null;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _threadService: ThreadService,
    private _userService: UserService,
    private _subforumService: SubforumService,
    private authService: AuthService
  ) {

    this.threadForm = _formbuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      UserId: ['1', Validators.required],
      User: [''],
      SubforumId: ['', Validators.required],
      ParentSubforum: [''],
      IsLocked: [false],
      IsPinned: [false],
      IsFeatured: [false],
      IsAnnouncement: [false],
      CreatedAt: [new Date()],
      Comments: [[]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("New Thread Form Component: ngOnChanges()");
    if (changes.subforumId && changes.subforumId.currentValue !== undefined) {
      this.threadForm.patchValue({ SubforumId: this.subforumId });
      this.getParentSubforum();
    }
  }

  ngOnInit(): void {
    console.log("New Thread Form Component: ngOnInit()");

    const user: IUser = {
      CreatedAt: new Date(),
      Rank: 'Admin',
      Username: "Fizzy",
      UserPhoto: null,
      Threads: [],
      UserComments: [] 
    };

    this.threadForm.patchValue({ User: user });

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log('Current user:', this.currentUser);
          /*          this.threadForm.patchValue({ User: this.currentUser });*/
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }

  }

  getParentSubforum(): void {
    console.log("New Thread Form Component: getParentSubforum()");

    if (this.subforumId != null) {
      this._subforumService.getSubforumById(this.subforumId)
        .subscribe(data => {
          this.parentSubforum = data;
          this.threadForm.patchValue({ ParentSubforum: this.parentSubforum });
        })

    }
  }

  /* Temporary for testing */
  getUser(): void {
    console.log("New Thread Form Component: getUser()");
    
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    console.log("New Thread form submitted:");
    console.log(this.threadForm);
    const newThread = this.threadForm.value;

    this._threadService.createThread(newThread)
      .subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this._router.navigate(['/subforum/' + this.subforumId?.toString]);
        }
        else {
          console.log('Thread creation failed');
        }
      });


  }

}
