import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubforum } from './subforum';
import { IThread } from '../thread/thread';
import { SubforumService } from './subforum.service';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-subforum-container',
  templateUrl: './subforum-container.component.html',
  styleUrls: ['./subforum-container.component.css']
})

export class SubforumContainerComponent implements OnInit {
  subforum: ISubforum | null = null;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  pageNumbers: number[] = [];
  lastPageIndex = 1;
  orderedThreads: IThread[] = [];

  currentUser: any = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _subforumService: SubforumService,
    private authService: AuthService) {}

  calculatePages(): void {
    console.log("Subforum Container Component: calculatePages()");
    let threadNumber = this.subforum?.Threads.length;
    if (threadNumber != null && threadNumber > 0) {
      this.totalPages = Math.ceil(threadNumber / 10);
      for (let i = 1; i <= this.totalPages; i++) {
        this.pageNumbers.push(i);
      }
    }
    else {
      console.log("Error calculating pages, this subforum's thread count is either null or 0");
    }
  }

  getSubforumData(id: number): void {
    console.log("Subforum Container Component: getSubforumData()");
    this._subforumService.getSubforumById(+id).subscribe(
      data => {
        this.subforum = data;
        console.log("Subforum Name: " + this.subforum?.Name);
        console.log("Total threads: " + this.subforum?.Threads.length);
        this.calculatePages();

        this.orderThreads();
      },
      error => {
        console.error('Error fetching subforum:', error);
        this._router.navigate(['/']);
      }
    );
  }

  // By ChatGPT
  orderThreads(): void {
    console.log("Subforum Container Component: orderThreads()");

    if (this.subforum?.Threads) {
      this.orderedThreads = this.subforum.Threads.sort((a, b) => {
        // Debugging: Check if threads have comments
        console.log(`Thread A Comments: ${a.Comments?.length}, Thread B Comments: ${b.Comments?.length}`);

        const lastCommentA = a.Comments && a.Comments.length > 0
          ? a.Comments.reduce((max, comment) => comment.CreatedAt > max.CreatedAt ? comment : max, a.Comments[0]).CreatedAt
          : new Date(0);

        const lastCommentB = b.Comments && b.Comments.length > 0
          ? b.Comments.reduce((max, comment) => comment.CreatedAt > max.CreatedAt ? comment : max, b.Comments[0]).CreatedAt
          : new Date(0);

        // Debugging: Check the dates being compared
        console.log(`Last Comment A Date: ${lastCommentA}, Last Comment B Date: ${lastCommentB}`);

        // Safeguard against null or invalid dates
        if (!(lastCommentA instanceof Date) || !(lastCommentB instanceof Date)) {
          console.error('Invalid date encountered in sorting.');
          return 0;
        }

        return lastCommentB.getTime() - lastCommentA.getTime();
      });

      console.log("Ordered threads length: " + this.orderedThreads.length);
    } else {
      console.log("Error fetching subforum Threads");
    }
  }

  getThreadsForCurrentPage(): IThread[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.orderedThreads.slice(startIndex, startIndex + this.pageSize);
  }

  ngOnInit(): void {
    console.log("Subforum Container Component: ngOnInit()");

    this._route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id != null) {
        this.getSubforumData(+id);
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
  }


  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

}







