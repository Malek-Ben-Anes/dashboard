import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingStudentModule} from './routes/admin.routing';
import {RouterModule} from '@angular/router';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {MaterialModule} from '@app/material.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TeacherProfileComponent} from './teacher/teacher/teacher-profile/teacher-profile.component';
import {TeacherListComponent} from './teacher/teacher-list/teacher-list.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {TeacherComponent} from './teacher/teacher/teacher.component';
import {GroupListComponent} from './group/group-list/group-list.component';
import {SubjectListComponent} from './subject/subject-list/subject-list.component';
import {GroupComponent} from './group/group/group.component';
import {StudentComponent} from './student/student/student.component';
import {StudentListComponent} from './student/student-list/student-list.component';
import {StudentProfileComponent} from './student/student/student-profile/student-profile.component';
import {StudentAssignComponent} from './group/group/student-assign/student-assign.component';
import {GroupTimetableComponent} from './group/group/group-timetable/group-timetable.component';
import {BulletinComponent} from './student/student/bulletin/bulletin.component';
import {FilterBulletinComponent} from './student/student/bulletin/filter/filter.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';
import {StudentFilterComponent} from './student/student-list/student-filter/student-filter.component';
import {TimeTableComponent} from './student/student/time-table/time-table.component';
import {GroupDetailComponent} from './group/group/group-detail/group-detail.component';
import {SubjectFormComponent} from './subject/subject-form/subject-form.component';
import {SubjectComponent} from './subject/subject.component';
import {TeacherTimetableComponent} from './teacher/teacher/teacher-timetable/teacher-timetable.component';
import {TeacherGroupsComponent} from './teacher/teacher/teacher-groups/teacher-groups.component';
import {TeacherGroupListComponent} from './teacher/teacher/teacher-groups/group-list/teacher-group-list.component';
import {TeacherSubjectListComponent} from './teacher/teacher/teacher-groups/teacher-subject-list/teacher-subject-list.component';
import {NotifcationListComponent} from './notifications/notifcations-list/notifcation-list.component';
import {UsersNotificationFormComponent} from './notifications/users-notification-form/users-notification-form.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material';
import {HttpLoaderFactory} from '@app/header/header.module';
import {DialogContentExampleDialogComponent} from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import {SharedModule} from '@app/commons/shared.module';
import {ErrorDialogComponent} from '@app/commons/error-dialog/error-dialog.component';
import {MarksModuleModule} from '@app/marks-module/marks-module.module';
import {NotificationListComponent} from './notifications/notification-list/notification-list.component';

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherListComponent,
    TeacherProfileComponent,
    StudentComponent,
    StudentListComponent,
    StudentProfileComponent,
    SubjectListComponent,
    GroupListComponent,
    GroupComponent,
    GroupDetailComponent,
    StudentAssignComponent,
    GroupTimetableComponent,
    BulletinComponent,
    FilterBulletinComponent,
    UpdatePasswordComponent,
    StudentFilterComponent,
    TimeTableComponent,
    SubjectFormComponent,
    SubjectComponent,
    TeacherTimetableComponent,
    TeacherGroupsComponent,
    TeacherGroupListComponent,
    TeacherSubjectListComponent,
    NotificationsComponent,
    NotifcationListComponent,
    UsersNotificationFormComponent,
    NotificationListComponent,
  ],
  entryComponents: [
    DialogContentExampleDialogComponent,
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarksModuleModule,
    AdminRoutingStudentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MaterialModule,
    DragDropModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModuleModule { }
