import { Component, OnInit, Input } from '@angular/core';
import { ISubforum } from './subforum';
import { Router } from '@angular/router';
import { SubforumService } from './subforum.service';

@Component({
  selector: 'app-subforum',
  templateUrl: './subforum.component.html',
  styleUrls: ['./subforum.component.css']
})

export class SubforumComponent implements OnInit {
  /*@Input() subforum: ISubforum;*/

  constructor(
    private _router: Router,
    private _subforumService: SubforumService) { }

  ngOnInit(): void {
    console.log("Subforum Component: ngOnInit()")
  }
}

