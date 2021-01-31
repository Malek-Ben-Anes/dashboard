import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MaterialModule} from './material.module';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from '@app/app.routing';
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from '@app/app.component';
import {LoginComponent} from './login/login.component';
import {FooterComponent} from '@app/footer/footer.component';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import {DialogContentExampleDialogComponent} from './commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import {ContentComponent} from './content/content.component';
import {AuthInterceptor} from './services/auth/auth-interceptor';
import {StudentModuleModule} from './student-module/student-module.module';
import {HeaderModule} from './header/header.module';
import {AdminModuleModule} from './admin-module/admin-module.module';
import {TeacherModuleModule} from './teacher-module/teacher-module.module';
import {DatePipe} from '@angular/common';
import {SharedModule} from './commons/shared.module';
import {PatchPasswordComponent} from './patch-password/patch-password.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    TranslateModule,
    BrowserAnimationsModule,
    ToastrModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    DragDropModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule,
    HeaderModule,
    AdminModuleModule,
    StudentModuleModule,
    TeacherModuleModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    FourOhFourComponent,
    ContentComponent,
    PatchPasswordComponent,
  ],
  exports: [
    MaterialModule,
    TranslateModule,
  ],
  entryComponents: [
    DialogContentExampleDialogComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
