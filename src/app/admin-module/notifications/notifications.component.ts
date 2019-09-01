import * as _ from 'lodash';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationService } from 'app/services/notification.service';
import { Notification } from 'app/models/Notification';
import { AuthService } from 'app/services/auth/auth.service';
import { User } from 'app/models/User';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  TABS = [{ 'NOTIFICATIONS_LIST': 0, 'label': 'Notifications' }, { 'NOTIFY_USERS': 1, 'label': 'Notifier utilisateurs' }];
  selected = new FormControl(0);

  loggedUser: User;
  newNotifications: number;
  notifications: Notification[];

  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.RestoreSomeDate();

  }

  private RestoreSomeDate() {
    let userNotif: number;
    this.authService.getUser().subscribe(user => { this.loggedUser = user; userNotif = user.newNotifications;
                                                   this.retrieveLoggedUserNotifications(user.id); });
    this.newNotifications = _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : userNotif;
  }

  retrieveLoggedUserNotifications (userId: string) {
    this.notificationService.find(userId)
        .then(notifications => this.notifications = notifications)
        .catch(err => console.log(err));
  }
}


