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

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

/*import {
  AgmCoreModule
} from '@agm/core';*/
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TeacherService } from './services/teacher.service';
import { StepperComponent } from './stepper/stepper.component';

/*import { TeacherService } from './services/teacher.service';
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
  ],
  providers: [TeacherService/*, ImageService, FileUploadService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
