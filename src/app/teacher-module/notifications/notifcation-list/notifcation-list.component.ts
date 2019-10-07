import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'app/models/Notification';

@Component({
  selector: 'app-notifcation-list',
  templateUrl: './notifcation-list.component.html',
  styleUrls: ['./notifcation-list.component.scss']
})
export class NotifcationListComponent implements OnInit {

  @Input('notifications')
  notifications: Notification[];

  @Input('newNotifications')
  newNotifications: number;

  ngOnInit() {}
}
