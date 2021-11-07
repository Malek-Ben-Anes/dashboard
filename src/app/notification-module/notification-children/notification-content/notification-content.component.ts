import {Component, Input, OnInit} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';
import {User} from '@app/models/User';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {Notification} from '@app/models/Notification';
import {environment} from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '@app/models/enums/Profile';

@Component({
  selector: 'app-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.css'],
})
export class NotificationContentComponent implements OnInit {
  @Input('isNotifReceived') isNotifReceived: boolean;
  @Input() notification: Notification;

  panelOpenState = false;

  BASE_URL = environment.resourceEndpoint;

  currentUser: User;

  constructor(private authService: AuthService, private notificationService: NotificationService, private teachersService: TeacherService, private toast: ToastrService) { }

  async ngOnInit() {

  }

  isAllowedToDelete(): boolean {
    // Notifier user and Admins are the unique profiles that are allowed to delete a notification.
    return !this.isNotifReceived || this.currentUser.type === Profile.USER;
  }

  async onDelete(event, notificationId: string) {
    event.currentTarget.disabled = true;
    try {
      await this.notificationService.delete(notificationId);
      this.toast.success(`La suppression a été effectué avec Succés!`, 'OK!');
    } catch (e) {
      this.toast.error(`La suppression de la Notification a échoué!`, 'KO!');
    }
  }
}
