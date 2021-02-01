import {Component, OnInit} from '@angular/core';
import {Notification} from '@app/models/Notification';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '@app/services/auth/auth.service';
import {NotificationService} from '@app/services/notification.service';
import { User } from '@app/models/User';

@Component({
  selector: 'app-notifcation-list',
  templateUrl: './notifcation-list.component.html',
  styleUrls: ['./notifcation-list.component.scss'],
})
export class NotifcationListComponent implements OnInit {
  notifications: Notification[];
  currentUser: User;

  constructor(private translate: TranslateService, private authService: AuthService, private notificationService: NotificationService) {
  }

  async ngOnInit() {
    await this.authService.getLoggedUser().then((user) => this.currentUser = user);
    this.notificationService.findAll(this.currentUser.id)
        .then((notifs) => this.notifications = notifs)
        .catch((err) => console.log(err));
  }
}
