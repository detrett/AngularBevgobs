import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IThread } from './thread';
import { ThreadService } from './thread.service';

@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})

export class ThreadContainerComponent implements OnInit {
  thread: IThread | null = null;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _threadService: ThreadService) { }

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
  }
}
