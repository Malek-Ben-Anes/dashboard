import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';
import {User} from '@app/models/User';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {Notification} from '@app/models/Notification';
import {environment} from 'environments/environment';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.css'],
})
export class NotificationContentComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input('isNotifReceived') isNotifReceived: boolean;
  errorMessage: string;

  panelOpenState = false;

  BASE_URL = environment.resourceEndpoint;

  notifications: Notification[] = [];

  isLoading = false;
  currentUser: User;

  pageIndex:number = 0;
  pageSize:number = 15;
  lowValue:number = 0;
  highValue:number = 15;

  constructor(private authService: AuthService, private notificationService: NotificationService, private teachersService: TeacherService) { }

  async ngOnInit() {
    this.currentUser = await this.authService.getLoggedUser();
    const notifiedId = this.isNotifReceived ? this.currentUser.id : undefined;
    const notifierId = !this.isNotifReceived ? this.currentUser.id : undefined;
    await this.findNotifications(notifiedId, notifierId);
  }

  getPaginatorData(event) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  async findNotifications(notifiedId: string, notifierId: string) {
    this.isLoading = true;
    try {
      this.notifications = await this.notificationService.findAll(notifiedId, notifierId);
    } catch (error) {
      this.errorMessage = `${error.status}: ${error.error.message}`,
      this.isLoading = false;
    }
  }

  onDelete(event, notificationId: string) {
    event.currentTarget.disabled = true;
    this.notificationService.delete(notificationId).then().catch((err) => alert(err));
  }
}
