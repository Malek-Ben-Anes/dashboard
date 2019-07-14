import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss']
})
export class NotificationBellComponent implements OnInit, OnChanges {

  @Input('notifsNumber') notifsNumber: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ng onchanges:", changes);
    if (changes.notifsNumber != null) {
      this.notifsNumber = changes.notifsNumber.currentValue;
    }
  }

}
