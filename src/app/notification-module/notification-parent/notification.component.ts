import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NotificationService} from '@app/services/notification.service';
import {Notification} from '@app/models/Notification';
import {AuthService} from '@app/services/auth/auth.service';
import {User} from '@app/models/User';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationsComponent implements OnInit {
  readonly TABS = [
    {'NOTIFY_USERS': 0, 'label': 'All.text.notifications.notifier'},
    {'NOTIFICATIONS_RECEIVED': 1, 'label': 'All.text.notifications.receivedNotifications'},
    {'NOTIFICATIONS_SENT': 2, 'label': 'All.text.notifications.sentNotifications'},
  ];

  selected = new FormControl(0);
  loggedUser: User;
  newNotifications: number;
  notifications: Notification[];

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.restoreSomeDate();
  }

  private restoreSomeDate() {
    let userNotif: number;
    this.authService.getUser().subscribe((user) => {
      this.loggedUser = user; userNotif = user.newNotifications;
      this.retrieveLoggedUserNotifications(user.id);
    });
    this.newNotifications = _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : userNotif;
  }

  retrieveLoggedUserNotifications(userId: string) {
    this.notificationService.findAll(userId)
        .then((notifications) => this.notifications = notifications)
        .catch((err) => console.log(err));
  }
}


