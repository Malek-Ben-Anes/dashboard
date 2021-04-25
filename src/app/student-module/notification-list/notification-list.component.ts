import * as _ from 'lodash';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {Notification} from '@app/models/Notification';
import {TranslateService} from '@ngx-translate/core';
import {User} from '@app/models/User';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  errorMessage: string;

  BASE_URL = environment.resourceEndpoint;


  loggedUser: User;
  userNotificationsNumber: number;
  notifications: Notification[] = [];

  dataSource = new MatTableDataSource<Notification>(this.notifications);
  displayedColumns: string[] = ['Title', 'Content', 'Notifier', 'File', 'Date'];

  isLoading = false;

  constructor(private authService: AuthService,
              private notificationService: NotificationService, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.authService.getLoggedUser().then((loggedUser) => {
        this.loggedUser = loggedUser;
        this.userNotificationsNumber = this.formatNotificationsNumber(this.loggedUser.newNotifications);
        this.retrieveLoggedUserNotifications(this.loggedUser.id);
      });
    }
  }

  private formatNotificationsNumber(userNotif: any): number {
    return _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : userNotif;
  }

  private retrieveLoggedUserNotifications(userId: string): void {
    this.notificationService.findAll(userId)
        .then((notifications) => {
          this.notifications = notifications;
          this.refershPaginator();
          setTimeout(() => {
            this.authService.saveNewNotifications(0);
          }, 1000);
        })
        .catch((err) => console.log(err));
  }

  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Notification>(this.notifications);
    this.dataSource.paginator = this.paginator;
  }
}
