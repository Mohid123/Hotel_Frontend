import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-load',
  templateUrl: './skeleton-load.component.html',
  styleUrls: ['./skeleton-load.component.scss']
})
export class SkeletonLoadComponent implements OnInit {

  Arr = Array;
  num:number = 8;

  constructor() { }

  ngOnInit(): void {
  }

}
