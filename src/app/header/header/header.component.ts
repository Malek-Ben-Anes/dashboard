import {Component, OnInit, OnDestroy} from '@angular/core';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import {User} from '@app/models/User';
import {AuthService} from '@app/services/auth/auth.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {WebsocketService} from '@app/services/shared/web-socket/websocket.service';
import { Notification } from '@app/models/Notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedUserSubscription: Subscription;
  isLogged = false;
  loggedUser: User;
  roles: string[];

  showMenuItems = false;

  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private toast: ToastrService,
              private translate: TranslateService,
              private webSocket: WebsocketService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.loggedUserSubscription = this.authService.getUser().subscribe((loggedUser) => this.loggedUser = loggedUser);
      this.authService.emitUserSubject();
      this.roles = this.tokenStorage.getAuthorities();
      this.loadWebSocket();
    }
  }

  async loadWebSocket() {
    await this.webSocket.connect();
    // update user on state change
    this.webSocket.subscribe('/workflow/states', async (notification: Notification) => {
      if (notification && notification.notifiedUsers && notification.notifiedUsers.length) {
        if (notification.notifiedUsers.find((notified) => notified.id === this.loggedUser.id)) {
          const message = await this.translate.instant('All.text.notifications.justReceivedNotifiction');
          const title = await this.translate.instant('All.text.notifications.title');
          this.toast.info(message, title);
        }
      }
    });
  }

  ngOnDestroy() {
    this.loggedUserSubscription.unsubscribe();
    // this.webSocket.unsubscribe();
  }

  showBar() {
    this.showMenuItems = !this.showMenuItems;
    console.log(this.showMenuItems);
  }
}
