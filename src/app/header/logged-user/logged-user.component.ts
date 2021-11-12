import * as _ from 'lodash';
import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {User} from '@app/models/User';
import {RouterLink} from '@app/app.routing';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import { BASE_URL } from '@app/app.component';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from '@app/services/shared/web-socket/websocket.service';
import { Notification } from '@app/models/Notification';
import { AuthService } from '@app/services/auth/auth.service';
import { Subscription } from 'rxjs';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: any | RouteInfo[][] =
{
  ADMIN_NAVIGATION_BAR: [{'router': '/app/students', 'label': 'header.students'},
    {'router': '/app/teachers', 'label': 'header.teachers'},
    {'router': '/app/subjects', 'label': 'header.program'},
    {'router': '/app/groups', 'label': 'header.groups'},
    {'router': '/app/notifications', 'label': '', 'icon': 'bell'}],

  TEACHER_NAVIGATION_BAR: [
    {'router': '/app/show-teacher-time-table', 'label': 'header.teacher.timetable'},
    {'router': '/app/show-groups-list', 'label': 'header.teacher.groups'},
    {'router': '/app/prof-notifications', 'label': '', 'icon': 'bell'}],

  STUDENT_NAVIGATION_BAR: [
    {'router': '/app/show-marks-list', 'label': 'header.student.marks'},
    {'router': '/app/show-bulletins', 'label': 'header.student.bulletins'},
    {'router': '/app/show-time-table', 'label': 'header.student.timetable'},
    {'router': '/app/show-notifications', 'label': '', 'icon': 'bell'}],
};
@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss'],
})
export class LoggedUserComponent implements OnInit {
  ROUTER_LINK: RouterLink;
  readonly BASE_URL: string = BASE_URL;

  loggedUserSubscription: Subscription;
  @Input('roles') roles: string[];

  loggedUser: User;

  authority: string;
  navBar = [];

  userSubps: Subscription;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private translate: TranslateService,
              private toast: ToastrService,
              private webSocket: WebsocketService,
              private authService: AuthService) {
  }

  async ngOnInit() {
    this.loggedUser = await this.authService.getLoggedUser();

    this.userSubps = this.authService.getUser().subscribe((user) => this.loggedUser = user);
    _.every(this.roles, (role) => {
      this.getNavigationBarConfiguration(role);
    });
    this.loadWebSocket();
  }

  async loadWebSocket() {
    await this.webSocket.connect();
    // update user on state change
    this.webSocket.subscribe('/workflow/states', async (notification: Notification) => {
      if (notification && notification.notifiedUsers && notification.notifiedUsers.length && this.loggedUser) {
        if (notification.notifiedUsers.find((notified) => notified.id === this.loggedUser.id)) {
          const message = await this.translate.instant('All.text.notifications.justReceivedNotifiction');
          const title = await this.translate.instant('All.text.notifications.alert');
          this.toast.info(message, title);
          this.updateUserNewNotifications();
        }
      }
    });
  }

  private async updateUserNewNotifications() {
    this.loggedUser.newNotifications++;
    this.authService.save(this.loggedUser);
    this.authService.emitUserSubject();
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigate(['app', 'auth', 'login']);
  }

  isAdmin(): boolean {
    return this.loggedUser && this.loggedUser.type && this.loggedUser.type.toLocaleUpperCase() != 'STUDENT' && this.loggedUser.type.toLocaleUpperCase() != 'TEACHER';
  }

  updatePasswordRedirect() {
    this.router.navigate(['app', 'update-user-password']);
  }

  showProfile() {
    if (this.authority === 'ROLE_TEACHER') {
      this.router.navigate(['app', 'show-teacher-profile']);
    } else if (this.authority === 'ROLE_STUDENT') {
      this.router.navigate(['app', 'show-profile']);
    }
  }

  private getNavigationBarConfiguration(role) {
    switch (role) {
      case 'ROLE_ADMIN':
        this.authority = 'ROLE_ADMIN';
        this.navBar = ROUTES.ADMIN_NAVIGATION_BAR;
        break;

      case 'ROLE_TEACHER':
        this.authority = 'ROLE_TEACHER';
        this.navBar = ROUTES.TEACHER_NAVIGATION_BAR;
        break;

      default:
        this.authority = 'ROLE_STUDENT';
        this.navBar = ROUTES.STUDENT_NAVIGATION_BAR;
    }
  }

  ngOnDestroy() {
    if (this.loggedUserSubscription) {
      this.loggedUserSubscription.unsubscribe();
    }
    if (this.userSubps) {
      this.userSubps.unsubscribe();
    }
  }
}
