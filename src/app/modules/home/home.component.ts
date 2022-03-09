import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BurgerComponent } from 'src/app/reusables/burger/burger.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }


}
