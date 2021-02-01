import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@app/models/User';
import { Notification } from '@app/models/Notification';
import { AuthService } from '@app/services/auth/auth.service';
import { NotificationService } from '@app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  TABS = [
    { 'NOTIFICATIONS_LIST': 0, 'label': this.transate.instant('All.tab.Notifications.Retrieve')},
    { 'NOTIFY_USERS': 1, 'label': this.transate.instant('All.tab.Notifications.send')}
  ];
  selected = new FormControl(0);

  loggedUser: User;
  newNotifications: number;
  notifications: Notification[];

  constructor(private authService: AuthService, private notificationService: NotificationService, private transate: TranslateService) { }

  ngOnInit() {
    this.RestoreSomeDate();
  }

  private RestoreSomeDate() {
    let userNotif: number;
    this.authService.getLoggedUser()
                    .then(user => { this.loggedUser = user; console.log(this.loggedUser);
                                    userNotif = this.loggedUser.newNotifications;
                                    this.retrieveLoggedUserNotifications(this.loggedUser.id);
                                  });
    this.newNotifications = _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : userNotif;
  }

  retrieveLoggedUserNotifications (userId: string) {
    this.notificationService.findAll(userId)
        .then(notifications => this.notifications = notifications)
        .catch(err => console.log(err));
  }
}
