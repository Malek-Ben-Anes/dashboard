import * as _ from 'lodash';
import { Component, OnInit, Input } from '@angular/core';
import { Notification } from '@app/models/Notification';
import { AuthService } from '@app/services/auth/auth.service';
import { User } from '@app/models/User';

@Component({
  selector: 'app-notifcation-list',
  templateUrl: './notifcation-list.component.html',
  styleUrls: ['./notifcation-list.component.scss']
})
export class NotifcationListComponent implements OnInit {

  @Input('notifications')
  notifications: Notification[];

  loggedUser: User;
  userNotificationsNumber: number;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.authService.getLoggedUser().then(loggedUser => {
          this.loggedUser = loggedUser;
          this.userNotificationsNumber = this.formatNotificationsNumber(this.loggedUser.newNotifications);
        });
    }
  }

  private formatNotificationsNumber(userNotif: any): number {
    return _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : userNotif;
  }
}
