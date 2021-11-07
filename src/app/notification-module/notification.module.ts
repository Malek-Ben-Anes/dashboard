import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {TeacherRoutingModule} from '@app/teacher-module/teacher.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@app/material.module';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@app/commons/shared.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpLoaderFactory} from '@app/header/header.module';
import {NotificationsComponent} from './notification-parent/notification.component';
import {NotificationListComponent} from './notification-children/notification-list/notification-list.component';
import {NotificationFormComponent} from './notification-children/notification-form/notification-form.component';
import { NotificationContentComponent } from './notification-children/notification-content/notification-content.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationListComponent,
    NotificationFormComponent,
    NotificationContentComponent,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    NotificationsComponent,
    NotificationListComponent,
    NotificationFormComponent,
    NotificationContentComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotificationsModuleModule { }
