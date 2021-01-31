import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {ContentComponent} from '@app/content/content.component';
import {Library} from '@app/models/enums/Library';
import {AuthGuardService} from '@app/services/auth/auth-guard.service';
import {TeacherListComponent} from '../teacher/teacher-list/teacher-list.component';
import {TeacherComponent} from '../teacher/teacher/teacher.component';
import {GroupListComponent} from '../group/group-list/group-list.component';
import {GroupComponent} from '../group/group/group.component';
import {StudentComponent} from '../student/student/student.component';
import {StudentListComponent} from '../student/student-list/student-list.component';
import {BulletinComponent} from '../student/student/bulletin/bulletin.component';
import {SubjectComponent} from '../subject/subject.component';
import {NotificationsComponent} from '../notifications/notifications.component';
import {Routers} from './router-link';

const routes: Routes = [
  {
    path: 'app',
    component: ContentComponent,
    children: [
      {
        path: Routers.TEACHERS,
        canActivate: [AuthGuardService],
        component: TeacherListComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.TEACHER_PROFILE_ID,
        canActivate: [AuthGuardService],
        component: TeacherComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.TEACHER_PROFILE,
        canActivate: [AuthGuardService],
        component: TeacherComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.STUDENTS,
        canActivate: [AuthGuardService],
        component: StudentListComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.STUDENT_PROFILE_ID,
        canActivate: [AuthGuardService],
        component: StudentComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.STUDENT_PROFILE,
        canActivate: [AuthGuardService],
        component: StudentComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.SUBJECTS,
        canActivate: [AuthGuardService],
        component: SubjectComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.GROUPS,
        canActivate: [AuthGuardService],
        component: GroupListComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.GROUP_DETAIL,
        canActivate: [AuthGuardService],
        component: GroupComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.GROUP_DETAIL_ID,
        canActivate: [AuthGuardService],
        component: GroupComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.BULLETIN,
        canActivate: [AuthGuardService],
        component: BulletinComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
      },
      {
        path: Routers.NOTIFICATIONS,
        canActivate: [AuthGuardService],
        component: NotificationsComponent,
      },
      {
        path: '',
        canActivate: [AuthGuardService],
        component: StudentListComponent,
        data: {expectedRole: Library.ROLE_ADMIN},
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
export class AdminRoutingStudentModule { }
