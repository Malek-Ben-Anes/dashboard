import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';

import {MatTableDataSource, MatPaginator} from '@angular/material';
import {User} from '@app/models/User';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {Notification} from '@app/models/Notification';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  @Input('isNotifReceived') isNotifReceived: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  errorMessage: string;

  BASE_URL = environment.resourceEndpoint;

  notifications: Notification[] = [];

  dataSource = new MatTableDataSource<Notification>(this.notifications);
  displayedColumns: string[] = ['Title', 'Content', 'Notifier', 'Notified', 'File', 'Date'];

  isLoading = false;
  currentUser: User;

  constructor(private authService: AuthService, private notificationService: NotificationService, private teachersService: TeacherService) { }

  ngOnInit() {
    this.authService.getLoggedUser().then((user) => {
      this.currentUser = user;
      const notifiedId = this.isNotifReceived ? this.currentUser.id : undefined;
      const notifierId = !this.isNotifReceived ? this.currentUser.id : undefined;
      this.findNotifications(notifiedId, notifierId);
      if (!this.isNotifReceived) {
        this.displayedColumns.push('Delete');
      }
    });
  }

  findNotifications(notifiedId: string, notifierId: string): void {
    this.isLoading = true;
    this.notificationService.findAll(notifiedId, notifierId)
        .then((notifs) => {
          this.notifications = notifs;
          this.refershPaginator();
          if (notifiedId) {
            setTimeout(() => {
              this.authService.saveNewNotifications(0);
            }, 1000);
          }
        }).catch((error) => {
          this.errorMessage = `${error.status}: ${error.error.message}`,
          this.isLoading = false;
        });
  }

  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Notification>(this.notifications);
    this.dataSource.paginator = this.paginator;
  }

  onDelete(event, notificationId: string) {
    event.currentTarget.disabled = true;
    this.notificationService.delete(notificationId).then().catch((err) => alert(err));
  }
}
