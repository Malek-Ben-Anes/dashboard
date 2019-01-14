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
import { TableListComponent } from './table-list/table-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';

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
        path: 'subjects',
        component: SubjectListComponent
    },
    {
        path: 'groups',
        component: GroupListComponent
    },
    {
        path: 'group-detail',
        component: GroupDetailComponent
    },
    {
        path: 'group-detail/:id',
        component: GroupDetailComponent
    },
    {
        path: 'lessons',
        component: LessonListComponent
    },
    {
        path: '',
        component: HomeComponent
    },

    

    // {
    //     path: 'user-profile',
    //     component: UserProfileComponent
    // },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
     
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
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
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
