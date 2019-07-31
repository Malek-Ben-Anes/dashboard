import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherRoutingModule } from './teacher.routing';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeacherTimeTableComponent } from './teacher-time-table/teacher-time-table.component';
import { GroupListComponent } from './group-list/group-list.component';
import { StudentsMarksComponent } from './students-marks/students-marks.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotifcationListComponent } from './notifications/notifcation-list/notifcation-list.component';
import { UsersNotificationFormComponent } from './notifications/users-notification-form/users-notification-form.component';

@NgModule({
  declarations: [
    TeacherProfileComponent,
    TeacherTimeTableComponent,
    GroupListComponent,
    StudentsMarksComponent,
    NotificationsComponent,
    NotifcationListComponent,
    UsersNotificationFormComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollDispatchModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TeacherModuleModule { }
