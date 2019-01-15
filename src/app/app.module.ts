import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


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


import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';      
import {MatCardModule} from '@angular/material/card';     

 

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatDatepickerModule, 
  MatNativeDateModule ,
} from '@angular/material';



/*import {
  AgmCoreModule
} from '@agm/core';*/
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { SubjectService } from './services/subject.service';
import { GroupService } from './services/group.service';
import { DataService } from './services/data.service';


import { TeacherComponent } from './teacher/teacher/teacher.component';
import { TeacherSubjectComponent } from './teacher/teacher-subject/teacher-subject.component';
import { StepperComponent } from './stepper/stepper.component';
import { GroupListComponent } from './group-list/group-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';

import { StudentComponent } from './student/student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonService } from './services/lesson.service';

/*import { DataService } from './services/teacher.service';
import { FileUploadService } from './services/file-upload.service';
import { ImageService } from './services/image.service';*/


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

    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,        // <----- import for date formating(optional)


    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,

    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,

   
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

    TeacherComponent,
    TeacherSubjectComponent,
    TableListComponent,
    TeacherListComponent,
    TeacherProfileComponent,

    StudentComponent,
    StudentListComponent,
    StudentProfileComponent,

    StepperComponent,
    SubjectListComponent,
    GroupListComponent,
    GroupDetailComponent,
    LessonListComponent,
    LessonDetailComponent,
  ],
  exports: [
    StepperComponent,
  ],
  providers: [TeacherService,StudentService, DataService, SubjectService, GroupService, LessonService/*, ImageService, FileUploadService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
