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

const routes: Routes = [
    {
        path: 'home',
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
        component: TeacherListComponent
    },
    {
        path: 'teacher-profile/:id',
        component: TeacherComponent
    },
    {
        path: 'teacher-profile',
        component: TeacherComponent
    },

    {
        path: 'students',
        component: StudentListComponent
    },
    {
        path: 'student-profile/:id',
        component: StudentComponent
    },
    {
        path: 'student-profile',
        component: StudentComponent
    },
    {
        path: 'subjects',
        component: SubjectComponent
    },
    {
        path: 'groups',
        component: GroupListComponent
    },
    {
        path: 'group-detail',
        component: GroupComponent
    },
    {
        path: 'group-detail/:id',
        component: GroupComponent
    },
    {
        path: 'lessons',
        component: LessonListComponent
    },
    {
        path: 'lesson-detail',
        component: LessonDetailComponent
    },
    {
        path: 'lesson-detail/:id',
        component: LessonDetailComponent
    },
    {
        path: 'marks',
        component: MarkComponent
    },
    {
        path: 'bulletin',
        component: BulletinComponent
    },
    {
        path: 'messages',
        component: MessagesComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'site-vitrine',
        component: LandingPageComponent
    },
    {
        path: '',
        component: HomeComponent
    }
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