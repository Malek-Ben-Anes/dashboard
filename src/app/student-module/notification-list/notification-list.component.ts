import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services/notification.service';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { AuthService } from 'app/services/auth/auth.service';
import { Student } from 'app/models/Student';
import { User } from 'app/models/User';
import { Notification } from 'app/models/Notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  user: Student;
  userNotificationsNumber: number;
  notifications: Notification[];

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService,
              private notificationService: NotificationService, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.authService.getUser().subscribe(loggedUser => {this.user = loggedUser
        this.userNotificationsNumber = this.formatNotificationsNumber(this.user.newNotifications) ;
        this.retrieveLoggedUserNotifications(this.user.id);
      });
    }
  }

  private formatNotificationsNumber(userNotif: any): number {
    return _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : userNotif;
  }

  retrieveLoggedUserNotifications (userId: string): void {
    this.notificationService.find(userId)
        .then(notifications => {this.notifications = notifications; console.log(this.notifications)})
        .catch(err => console.log(err));
  }
}
