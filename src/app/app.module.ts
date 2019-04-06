import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DemoMaterialModule } from './material.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material';



import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { TableListComponent } from './teacher/table-list/table-list.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

//import * as jwt_decode from "jwt-decode";


/*import {
  AgmCoreModule
} from '@agm/core';*/
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { SubjectService } from './services/subject.service';
import { GroupService } from './services/group.service';
import { DataService } from './services/data.service';
import { DialogflowService } from './services/dialogflow.service';
import { BulletinService } from 'app/services/bulletin.service';


import { TeacherComponent } from './teacher/teacher/teacher.component';
import { TeacherSubjectComponent } from './teacher/teacher-subject/teacher-subject.component';
import { StepperComponent } from './stepper/stepper.component';
import { GroupListComponent } from './group-list/group-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';


/*import { DataService } from './services/teacher.service';
import { ImageService } from './services/image.service';*/
import { StudentComponent } from './student/student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentProfileComponent } from './student/student/student-profile/student-profile.component';
import { LessonDetailComponent } from './lesson-list/lesson-detail/lesson-detail.component';
import { LessonService } from './services/lesson.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

import { StudentAssignComponent } from './group-detail/student-assign/student-assign.component';
import { GroupTimetableComponent } from './group-detail/group-timetable/group-timetable.component';
import { MarkComponent } from './marks/marks.component';
import { MarkService } from './services/mark.service';
import { HeaderComponent } from './header/header.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FileUploadService } from './services/file-upload.service';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageFormComponent } from './messages/message-form/message-form.component';
import { MessagesComponent } from './messages/messages.component';

import { GroupStudentListComponent } from './marks/group-student-list/group-student-list.component';
import { StudentMarksDetailComponent } from './marks/student-marks-detail/student-marks-detail.component';
import { LessonTimeTableComponent } from './lesson-list/lesson-time-table/lesson-time-table.component';
import { MarkFormComponent } from './marks/mark-form/mark-form.component';
import { FilterComponent } from './marks/filter/filter.component';
import { MarkDetailComponent } from './marks/student-view/mark-detail/mark-detail.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { FilterBulletinComponent } from './bulletin/filter/filter.component';
import { BulletinUploadComponent } from './bulletin/bulletin-upload/bulletin-upload.component';
import { BulletinListComponent } from './bulletin/student-view/bulletin-list/bulletin-list.component';
import { UpdatePasswordComponent } from './student/student/update-password/update-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AccueilComponent } from './landing-page/accueil/accueil.component';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { NewsComponent } from './landing-page/news/news.component';
import { ClubsComponent } from './landing-page/clubs/clubs.component';
import { ContactComponent } from './landing-page/contact/contact.component';
import { StudentFilterComponent } from './student/student-list/student-filter/student-filter.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,

    DemoMaterialModule,
    DragDropModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    MapsComponent,

    TeacherComponent,
    TeacherSubjectComponent,
    TableListComponent,
    TeacherListComponent,
    TeacherProfileComponent,
    FourOhFourComponent,

    StudentComponent,
    StudentListComponent,
    StudentProfileComponent,

    StepperComponent,
    SubjectListComponent,
    GroupListComponent,
    GroupDetailComponent,
    LessonListComponent,
    LessonDetailComponent,
    TableListComponent,
    StudentAssignComponent,
    GroupTimetableComponent,
    MarkComponent,
    HeaderComponent,
    AvatarComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageFormComponent,
    MessagesComponent,
    GroupStudentListComponent,
    StudentMarksDetailComponent,
    LessonTimeTableComponent,
    MarkFormComponent,
    FilterComponent,
    MarkDetailComponent,

    BulletinComponent,
    FilterBulletinComponent,
    BulletinUploadComponent,
    BulletinListComponent,
    UpdatePasswordComponent,
    LandingPageComponent,
    AccueilComponent,
    AboutUsComponent,
    NewsComponent,
    ClubsComponent,
    ContactComponent,
    StudentFilterComponent,
  ],
  exports: [
    StepperComponent,
  ],
  entryComponents: [
    LessonTimeTableComponent
  ],
  providers: [MatDialog, TeacherService, StudentService, DataService, SubjectService, GroupService, LessonService, 
    MarkService, FileUploadService, DialogflowService, BulletinService/*, ImageService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
