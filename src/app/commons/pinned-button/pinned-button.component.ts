import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pinned-button',
  templateUrl: './pinned-button.component.html',
  styleUrls: ['./pinned-button.component.scss']
})
export class PinnedButtonComponent implements OnInit, OnChanges {

  @Input()
  routerLink: string;
  
  @Input()
  tooltip: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.routerLink) {
      this.routerLink = changes.routerLink.currentValue;
    }
  }

  onClick() {
    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    }
  }

}
