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

  getItems(): void {
    console.log("Forum Component: getItems()")

    this._forumService.getForums().subscribe((data: IForum[]) => {
      this.forums = data;
    });
  }

  ngOnInit(): void {
    console.log("Forum Component: ngOnInit()")

    this.getItems();
  }

}
