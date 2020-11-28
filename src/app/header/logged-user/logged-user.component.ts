import * as _ from 'lodash';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { User } from 'app/models/User';
import { RouterLink } from 'app/app.routing';
import { TokenStorageService } from 'app/services/auth/token-storage.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: any | RouteInfo[][] =
{
  ADMIN_NAVIGATION_BAR: [{ 'router': '/app/students', 'label': 'header.students' },
  { 'router': '/app/teachers', 'label': 'header.teachers' },
  { 'router': '/app/subjects', 'label': 'header.program' },
  { 'router': '/app/groups', 'label': 'header.groups' },
  { 'router': '/app/notifications', 'label': 'header.notifications', 'icon': 'bell' }],

  TEACHER_NAVIGATION_BAR: [
  { 'router': '/app/show-teacher-profile', 'label': 'header.teacher.profile' },
  { 'router': '/app/show-teacher-time-table', 'label': 'header.teacher.timetable' },
  { 'router': '/app/show-groups-list', 'label': 'header.teacher.groups' },
  { 'router': '/app/prof-notifications', 'label': 'header.notifications', 'icon': 'bell' }],

  STUDENT_NAVIGATION_BAR: [{ 'router': '/app/show-profile', 'label': 'header.student.profile' },
  { 'router': '/app/show-marks-list', 'label': 'header.student.marks' },
  { 'router': '/app/show-bulletins', 'label': 'header.student.bulletins' },
  { 'router': '/app/show-time-table', 'label': 'header.student.timetable' },
  { 'router': '/app/show-notifications', 'label': 'header.student.notifications', 'icon': 'bell' }]
  // https://stackoverflow.com/questions/44073964/dynamic-template-based-on-value-rather-than-variable-with-ngtemplateoutlet
  /* https://stackoverflow.com/questions/31548311/angular-html-binding
     https://gearheart.io/blog/passing-pieces-of-markup-to-components-in-angular-2-and-problems-with-dynamic-content/ */
};
@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss']
})
export class LoggedUserComponent implements OnInit {

  ROUTER_LINK: RouterLink;

  @Input('loggedUser') loggedUser: User;
  @Input('roles') roles: string[];

  authority: string;
  navBar = [];

  constructor(private tokenStorage: TokenStorageService, private router: Router, private translate: TranslateService) { }

  ngOnInit() {
    _.every(this.roles, role => { this.getNavigationBarConfiguration(role) });
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigate(['app', 'auth', 'login']);
  }

  /**
   * Get navigation bar links routes and configurations depending on user Role
   */
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

}
