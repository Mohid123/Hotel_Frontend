import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {
  @ViewChild('fullWidth') fullWidth: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  addWidth() {
    this.fullWidth.nativeElement.style.width = "100%";
  }

  removeWidth() {
    this.fullWidth.nativeElement.style.width = "0%";
  }

}
