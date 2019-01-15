import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TeacherProfileComponent } from '../../teacher/teacher-profile/teacher-profile.component';
import { TableListComponent } from '../../teacher/table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'dashboard',
        component: DashboardComponent
    }]}, {
    path: '',
    children: [ {
      path: 'userprofile',
      component: TeacherProfileComponent
    }]
    }, {
      path: '',
      children: [ {
        path: 'icons',
        component: IconsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'notifications',
            component: NotificationsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'maps',
            component: MapsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'typography',
            component: TypographyComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'upgrade',
            component: UpgradeComponent
        }]
    },
    , {
        path: '',
        children: [ {
            path: 'user-profile',
            component: TeacherProfileComponent
        }]
    },
    /*{ path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile/:id',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },*/
];
