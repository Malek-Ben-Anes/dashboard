import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { BulletinListComponent } from './bulletin-list/bulletin-list.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { MarkListComponent } from './mark-list/mark-list.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentRoutingStudentModule } from './student.routing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/commons/shared.module';

@NgModule({
  declarations: [StudentProfileComponent, BulletinListComponent, NotificationListComponent, MarkListComponent, TimeTableComponent],
  imports: [
    CommonModule,
    StudentRoutingStudentModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    ScrollDispatchModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StudentModuleModule { }
