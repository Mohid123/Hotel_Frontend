import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { ViewportScroller, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit {

  public windowScrolled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document, private scroll: ViewportScroller) { }
  @HostListener('window:scroll', [])

 onWindowScroll() {
  if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
    this.windowScrolled = true;
  }
  else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
    this.windowScrolled = false;
  }
}

  scrollToTop() {
    this.scroll.scrollToPosition([0,0]);
  }

  ngOnInit(): void {
  }


}
