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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatDatepickerModule, MatNativeDateModule 
} from '@angular/material';

/*import {
  AgmCoreModule
} from '@agm/core';*/
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TeacherService } from './services/teacher.service';
import { SubjectService } from './services/subject.service';
import { DataService } from './services/data.service';
import { StepperComponent } from './stepper/stepper.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherSubjectComponent } from './teacher-subject/teacher-subject.component';
import { GroupListComponent } from './group-list/group-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

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

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,

    
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,        // <----- import for date formating(optional)


    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
   
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
    TableListComponent,
    TeacherListComponent,
    UserProfileComponent,
    StepperComponent,
    TeacherComponent,
    TeacherSubjectComponent,
    GroupListComponent,
    SubjectListComponent,
    GroupDetailComponent,
  ],
  providers: [TeacherService, DataService, SubjectService/*, ImageService, FileUploadService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
