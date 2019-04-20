import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './teacher/teacher/table-list/table-list.component';
import { TeacherProfileComponent } from './teacher/teacher/teacher-profile/teacher-profile.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher/teacher/teacher.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupComponent } from './group/group/group.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { StudentComponent } from './student/student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { LessonDetailComponent } from './lesson-list/lesson-detail/lesson-detail.component';
import { MarkComponent } from './marks/marks.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessagesComponent } from './messages/messages.component';
import { BulletinComponent } from './student/student/bulletin/bulletin.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SubjectComponent } from './subject/subject.component';

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
        path: 'signup',
        component: RegisterComponent
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
        path: 'site-vitrine',
        component: LandingPageComponent
    },
    {
        path: '',
        component: HomeComponent
    },


    // {
    //     path: 'user-profile',
    //     component: UserProfileComponent
    // },
    /*{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },*/
     
    //{ path: 'dashboard',      component: DashboardComponent },
        /*{
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    
     { path: 'dashboard',      component: DashboardComponent },
     { path: 'user-profile/:id',   component: UserProfileComponent },*/
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
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
