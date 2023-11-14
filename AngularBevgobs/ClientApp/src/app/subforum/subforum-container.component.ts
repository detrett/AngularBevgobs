import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubforum } from './subforum';
import { SubforumService } from './subforum.service';

@Component({
  selector: 'app-subforum-container',
  templateUrl: './subforum-container.component.html',
  styleUrls: ['./subforum-container.component.css']
})

export class SubforumContainerComponent implements OnInit {
  subforum: ISubforum | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _subforumService: SubforumService) { }

  getSubforumData(id: number): void {
    console.log("Subforum Container Component: getSubforumData()");
    this._subforumService.getSubforumById(+id).subscribe(
      data => {
        this.subforum = data;
        console.log("Subforum Name: " + this.subforum?.Name);
      },
      error => {
        console.error('Error fetching subforum:', error);
        this._router.navigate(['/']);
      }
    );
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
  }

}
