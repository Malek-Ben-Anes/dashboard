import * as _ from 'lodash';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationService } from 'app/services/notification.service';
import { Notification } from 'app/models/Notification';
import { AuthService } from 'app/services/auth/auth.service';
import { User } from 'app/models/User';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  TABS = [
          { 'NOTIFICATIONS_LIST': 0, 'label': 'All.text.notifications.notificationsList' },
          { 'NOTIFY_USERS': 1, 'label': 'All.text.notifications.Notifier' }
        ];
  selected = new FormControl(1);

  loggedUser: User;
  newNotifications: number;
  notifications: Notification[];

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private translate: TranslateService) { }

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


