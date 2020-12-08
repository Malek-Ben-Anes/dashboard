import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from '@app/content/content.component';
import { Library } from '@app/models/enums/Library';
import { AuthGuardService } from '@app/services/auth/auth-guard.service';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { MarkListComponent } from './mark-list/mark-list.component';
import { BulletinListComponent } from './bulletin-list/bulletin-list.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { TimeTableComponent } from './time-table/time-table.component';

export class StudentRouterLink {
    public static SHOW_PROFILE = 'show-profile';
    public static SHOW_MARK_LIST = 'show-marks-list';
    public static SHOW_BULLETIN = 'show-bulletins';
    public static SHOW_NOTIFICATIONS = 'show-notifications';
    public static SHOW_TIME_TABLE = 'show-time-table';
}

const routes: Routes = [
    {
        path: 'app',
        component: ContentComponent,
        children: [
            {
                path: StudentRouterLink.SHOW_PROFILE,
                canActivate: [AuthGuardService],
                component: StudentProfileComponent,
                data: { expectedRole: Library.ROLE_STUDENT }
            },
            {
                path: StudentRouterLink.SHOW_MARK_LIST,
                canActivate: [AuthGuardService],
                component: MarkListComponent,
                data: { expectedRole: Library.ROLE_STUDENT }
            },
            {
                path: StudentRouterLink.SHOW_BULLETIN,
                canActivate: [AuthGuardService],
                component: BulletinListComponent,
                data: { expectedRole: Library.ROLE_STUDENT }
            },
            {
                path: StudentRouterLink.SHOW_TIME_TABLE,
                canActivate: [AuthGuardService],
                component: TimeTableComponent,
                data: { expectedRole: Library.ROLE_STUDENT }
            },
            {
                path: StudentRouterLink.SHOW_NOTIFICATIONS,
                canActivate: [AuthGuardService],
                component: NotificationListComponent,
                data: { expectedRole: Library.ROLE_STUDENT }
            }
        ]
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
export class StudentRoutingStudentModule { }

