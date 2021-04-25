import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ContentComponent} from '@app/content/content.component';
import {Library} from '@app/models/enums/Library';
import {AuthGuardService} from '@app/services/auth/auth-guard.service';
import {TeacherProfileComponent} from './teacher-profile/teacher-profile.component';
import {TeacherTimeTableComponent} from './teacher-time-table/teacher-time-table.component';
import {GroupComponent} from './group/group-details/group.component';
import {StudentProfileComponent} from './group/group-details/student-profile/student-profile.component';
import {NotificationsComponent} from '@app/notification-module/notification-parent/notification.component';
import { GroupTabComponent } from './group/group-list/group-tab.component';

export class TeacherRouterLink {
  public static SHOW_PROFILE = 'show-teacher-profile';
  public static SHOW_TIME_TABLE = 'show-teacher-time-table';
  public static SHOW_GROUP_LIST = 'show-groups-list';
  public static STUDENT_PROFILE = 'show-student-profile/';
  public static APP_STUDENT_PROFILE = '/app/show-student-profile/';
  public static STUDENT_PROFILE_ID = 'show-student-profile/:id';
  public static SHOW_GROUP_DETAIL = 'show-groups-detail/:id';
  public static SHOW_MARK_LIST = 'assign-students-marks';
  public static SHOW_NOTIFICATIONS = 'prof-notifications';
}

const routes: Routes = [
  {
    path: 'app',
    component: ContentComponent,
    children: [
      {
        path: TeacherRouterLink.SHOW_PROFILE,
        canActivate: [AuthGuardService],
        component: TeacherProfileComponent,
        data: {expectedRole: Library.ROLE_TEACHER},
      },
      {
        path: TeacherRouterLink.SHOW_TIME_TABLE,
        canActivate: [AuthGuardService],
        component: TeacherTimeTableComponent,
        data: {expectedRole: Library.ROLE_TEACHER},
      },
      {
        path: TeacherRouterLink.SHOW_GROUP_LIST,
        canActivate: [AuthGuardService],
        component: GroupTabComponent,
        data: {expectedRole: Library.ROLE_TEACHER},
      },
      {
        path: TeacherRouterLink.STUDENT_PROFILE_ID,
        canActivate: [AuthGuardService],
        component: StudentProfileComponent,
        data: {expectedRole: Library.ROLE_TEACHER},
      },
      {
        path: TeacherRouterLink.SHOW_GROUP_DETAIL,
        canActivate: [AuthGuardService],
        component: GroupComponent,
        data: {expectedRole: Library.ROLE_TEACHER},
      },
      {
        path: TeacherRouterLink.SHOW_NOTIFICATIONS,
        canActivate: [AuthGuardService],
        component: NotificationsComponent,
        data: {expectedRole: Library.ROLE_TEACHER},
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
})
export class TeacherRoutingModule { }