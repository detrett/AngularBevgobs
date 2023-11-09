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

        // Log by ChatGPT
        console.log("Forums: " + this.forums.length)
        this.forums.forEach((forum, index) => {
          console.log(`Forum ${index}:`, forum);
          console.log("Forum id: " + forum.ForumId + ", Forum name: " + forum.Name);
          if (forum.Subforums) {
            console.log(", Subforums: " + forum.Subforums.length);
          } else {
            console.log(", Subforums: Not available");
          }
        });
      });
  }

  ngOnInit(): void {
    console.log("Forum Component: ngOnInit()")

    this.getForums();
  }

}
