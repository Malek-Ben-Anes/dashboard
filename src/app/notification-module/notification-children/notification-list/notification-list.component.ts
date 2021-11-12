import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';

import {MatAccordion, PageEvent} from '@angular/material';
import {User} from '@app/models/User';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {Notification} from '@app/models/Notification';
import {environment} from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input('isNotifReceived') isNotifReceived: boolean;

  panelOpenState = false;

  BASE_URL = environment.resourceEndpoint;

  notifications: Notification[] = [];

  isLoading = false;
  currentUser: User;

  pageEvent: PageEvent;
  pageIndex:number = 0;
  pageSize:number = 15;
  lowValue:number = 0;
  highValue:number = 15;

  constructor(private authService: AuthService, private notificationService: NotificationService, private teachersService: TeacherService, private toast: ToastrService) { }

  async ngOnInit() {
    this.currentUser = await this.authService.getLoggedUser();
    const notifiedId = this.isNotifReceived ? this.currentUser.id : undefined;
    const notifierId = !this.isNotifReceived ? this.currentUser.id : undefined;
    try {
      await this.findNotifications(notifiedId, notifierId);
      this.setNewNotificationsToZero();
    } catch {
    }
  }

  private async setNewNotificationsToZero() {
    const notifiedId = this.isNotifReceived ? this.currentUser.id : undefined;
    if (notifiedId) {
      setTimeout(async () => {
        this.currentUser = await this.authService.getLoggedUser();
        this.currentUser.newNotifications = 0;
        this.authService.save(this.currentUser);
        this.authService.emitUserSubject();
      }, 500);
    }
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
    try {
      this.isLoading = true;
      this.notifications = await this.notificationService.findAll(notifiedId, notifierId);
    } catch (error) {
      this.toast.error(`${error.status}: ${error.error.message}`, 'KO!');
    } finally {
      this.isLoading = false;
    }
  }
}
