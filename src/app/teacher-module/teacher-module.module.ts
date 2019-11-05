import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherRoutingModule } from './routes/teacher.routing';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeacherTimeTableComponent } from './teacher-time-table/teacher-time-table.component';
import { GroupTabComponent } from './group/group-tab.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotifcationListComponent } from './notifications/notifcation-list/notifcation-list.component';
import { UsersNotificationFormComponent } from './notifications/users-notification-form/users-notification-form.component';
import { GroupComponent } from './group/group/group.component';
import { RouterModule } from '@angular/router';
import { GroupStudentsComponent } from './group/group/group-students/group-students.component';
import { GroupTimetableComponent } from './group/group/group-timetable/group-timetable.component';
import { SharedModule } from 'app/commons/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'app/header/header.module';
import { StudentProfileComponent } from './group/group/student-profile/student-profile.component';
import { MarksModuleModule } from 'app/marks-module/marks-module.module';

@NgModule({
  declarations: [
    TeacherProfileComponent,
    TeacherTimeTableComponent,
    GroupTabComponent,
    GroupComponent,
    NotificationsComponent,
    NotifcationListComponent,
    UsersNotificationFormComponent,
    GroupStudentsComponent,
    StudentProfileComponent,
    GroupTimetableComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollDispatchModule,
    RouterModule,
    SharedModule,
    MarksModuleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TeacherModuleModule { }
