import { Component, OnInit } from '@angular/core';
import { IForum } from './forum';
import { Router } from '@angular/router';
import { ForumService } from './forum.service';


@Component({
  selector: 'app-forums',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {
  forums: IForum[] = [];

  constructor(
    private _router: Router,
    private _forumService: ForumService) { }

  getForums(): void {
    console.log("Forum Component: getForums()")

    this._forumService.getForums()
      .subscribe(data => {
        console.log('Data received: ', JSON.stringify(data));
        this.forums = data;
        this.forums.forEach(forum => console.log("Forum id: " + forum.ForumId + ", Forum name: " + forum.Name));
      });
  }

  ngOnInit(): void {
    console.log("Forum Component: ngOnInit()")

    this.getForums();
  }

}
