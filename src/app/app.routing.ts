import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher/teacher/teacher.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupComponent } from './group/group/group.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { StudentComponent } from './student/student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { LessonDetailComponent } from './lesson-list/lesson-detail/lesson-detail.component';
import { MarkComponent } from './marks/marks.component';
import { MessagesComponent } from './messages/messages.component';
import { BulletinComponent } from './student/student/bulletin/bulletin.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SubjectComponent } from './subject/subject.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { Library } from './models/Library';

const routes: Routes = [
    {
        path: 'home',
        canActivate: [AuthGuardService],
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'pm',
        component: PmComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'dashboard',
        component: AdminComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'teachers',
        canActivate: [AuthGuardService],
        component: TeacherListComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'teacher-profile/:id',
        canActivate: [AuthGuardService],
        component: TeacherComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'teacher-profile',
        canActivate: [AuthGuardService],
        component: TeacherComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },

    {
        path: 'students',
        canActivate: [AuthGuardService],
        component: StudentListComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'student-profile/:id',
        canActivate: [AuthGuardService],
        component: StudentComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'student-profile',
        canActivate: [AuthGuardService],
        component: StudentComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'subjects',
        canActivate: [AuthGuardService],
        component: SubjectComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'groups',
        canActivate: [AuthGuardService],
        component: GroupListComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'group-detail',
        canActivate: [AuthGuardService],
        component: GroupComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'group-detail/:id',
        canActivate: [AuthGuardService],
        component: GroupComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'lessons',
        canActivate: [AuthGuardService],
        component: LessonListComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'lesson-detail',
        canActivate: [AuthGuardService],
        component: LessonDetailComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'lesson-detail/:id',
        canActivate: [AuthGuardService],
        component: LessonDetailComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'marks',
        canActivate: [AuthGuardService],
        component: MarkComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'bulletin',
        canActivate: [AuthGuardService],
        component: BulletinComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'messages',
        canActivate: [AuthGuardService],
        component: MessagesComponent,
        data: {expectedRole: Library.ROLE_ADMIN} 
    },
    {
        path: 'notifications',
        canActivate: [AuthGuardService],
        component: NotificationsComponent
    },
    {
        path: '',
        canActivate: [AuthGuardService],
        component: HomeComponent
    },
    // { path: 'not-found', component: FourOhFourComponent },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }