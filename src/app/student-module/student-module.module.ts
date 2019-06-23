import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulletinListComponent } from './bulletin-list/bulletin-list.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MarkListComponent } from './mark-list/mark-list.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentRoutingStudentModule } from './student.routing';

@NgModule({
  declarations: [StudentProfileComponent, BulletinListComponent, NotificationListComponent, MarkListComponent, TimeTableComponent],
  imports: [
    CommonModule,
    StudentRoutingStudentModule
  ]
})
export class StudentModuleModule { }
