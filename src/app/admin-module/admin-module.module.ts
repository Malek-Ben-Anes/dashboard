import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingStudentModule } from './routes/admin.routing';
import { RouterModule } from '@angular/router';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeacherProfileComponent } from './teacher/teacher/teacher-profile/teacher-profile.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TeacherComponent } from './teacher/teacher/teacher.component';
import { UpdateTeacherPasswordComponent } from './teacher/teacher/update-teacher-password/update-teacher-password.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { GroupComponent } from './group/group/group.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { StudentComponent } from './student/student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentProfileComponent } from './student/student/student-profile/student-profile.component';
import { LessonDetailComponent } from './lesson-list/lesson-detail/lesson-detail.component';
import { StudentAssignComponent } from './group/group/student-assign/student-assign.component';
import { GroupTimetableComponent } from './group/group/group-timetable/group-timetable.component';
import { LessonTimeTableComponent } from './lesson-list/lesson-time-table/lesson-time-table.component';
import { BulletinComponent } from './student/student/bulletin/bulletin.component';
import { FilterBulletinComponent } from './student/student/bulletin/filter/filter.component';
import { UpdatePasswordComponent } from './student/student/update-password/update-password.component';
import { StudentFilterComponent } from './student/student-list/student-filter/student-filter.component';
import { TimeTableComponent } from './student/student/time-table/time-table.component';
import { GroupDetailComponent } from './group/group/group-detail/group-detail.component';
import { SubjectFormComponent } from './subject/subject-form/subject-form.component';
import { SubjectComponent } from './subject/subject.component';
import { TeacherTimetableComponent } from './teacher/teacher/teacher-timetable/teacher-timetable.component';
import { TeacherManageGroupsComponent } from './teacher/teacher/teacher-manage-groups/teacher-manage-groups.component';
import { TeacherGroupListComponent } from './teacher/teacher/teacher-manage-groups/teacher-group-list/teacher-group-list.component';
import { TeacherSubjectListComponent } from './teacher/teacher/teacher-manage-groups/teacher-subject-list/teacher-subject-list.component';
import { GroupDetailStudentListComponent } from './group/group/group-detail/group-detail-student-list/group-detail-student-list.component';
import { StudentAssignFilterComponent } from './group/group/student-assign/student-assign-filter/student-assign-filter.component';
import { GroupMarksComponent } from './group/group/group-marks/group-marks-parent/group-marks.component';

import { GroupMarksStudentDetailComponent } from './group/group/group-marks/group-marks-children/group-marks-student-detail/group-marks-student-detail.component';
import { GroupMarksFormComponent } from './group/group/group-marks/group-marks-children/group-marks-form/group-marks-form.component';
import { NotifcationListComponent } from './notifications/notifcation-list/notifcation-list.component';
import { UsersNotificationFormComponent } from './notifications/users-notification-form/users-notification-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpLoaderFactory } from 'app/header/header.module';
import { DialogContentExampleDialogComponent } from 'app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { SharedModule } from 'app/commons/shared.module';
import { ErrorDialogComponent } from 'app/commons/error-dialog/error-dialog.component';
import { GroupStudentListComponent } from './group/group/group-marks/group-marks-children/group-student-list/group-student-list.component';

@NgModule({
  declarations: [
    TeacherComponent,
    TeacherListComponent,
    TeacherProfileComponent,
    UpdateTeacherPasswordComponent,
    StudentComponent,
    StudentListComponent,
    StudentProfileComponent,
    SubjectListComponent,
    GroupListComponent,
    GroupComponent,
    GroupDetailComponent,
    LessonListComponent,
    LessonDetailComponent,
    StudentAssignComponent,
    GroupTimetableComponent,
    LessonTimeTableComponent,
    GroupStudentListComponent,
    BulletinComponent,
    FilterBulletinComponent,
    UpdatePasswordComponent,
    StudentFilterComponent,
    TimeTableComponent,
    SubjectFormComponent,
    SubjectComponent,
    TeacherTimetableComponent,
    TeacherManageGroupsComponent,
    TeacherGroupListComponent,
    TeacherSubjectListComponent,
    GroupDetailStudentListComponent,
    StudentAssignFilterComponent,
    GroupMarksComponent,
    GroupMarksStudentDetailComponent,
    GroupMarksFormComponent,
    NotificationsComponent,
    NotifcationListComponent,
    UsersNotificationFormComponent,

  ],
  entryComponents: [
    LessonTimeTableComponent,
    DialogContentExampleDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
        deps: [HttpClient]
      }
    }),
    MaterialModule,
    DragDropModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModuleModule { }
