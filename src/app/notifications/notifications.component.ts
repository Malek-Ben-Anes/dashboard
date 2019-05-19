import * as _ from 'lodash';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationService } from 'app/services/notification.service';
import { Notification } from 'app/models/Notification';
import { AuthService } from 'app/auth/auth.service';
import { TokenStorageService } from 'app/auth/token-storage.service';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  TABS = [{ 'NOTIFICATIONS_LIST': 0, 'label': 'Notifications' }, { 'NOTIFY_USERS': 1, 'label': 'Notifier utilisateurs' }];
  selected = new FormControl(0);

  loggedUSerId: string;
  newNotifications: number;
  notifications: Notification[];

  constructor(private tokenStorage: TokenStorageService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.RestoreSomeDate();
    this.notificationService.find(this.loggedUSerId)
        .then(notifications => { this.notifications = notifications; console.log(this.notifications); })
        .catch(err => console.log(err));
  }

  private RestoreSomeDate() {
    this.loggedUSerId = this.tokenStorage.getId();
    const userNotif: string = this.tokenStorage.getUserNewNotifications();
    this.newNotifications = _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : parseInt(userNotif);
  }
}


