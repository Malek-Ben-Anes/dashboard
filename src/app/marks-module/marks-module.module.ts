import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupMarksFormComponent } from './group-marks-children/group-marks-form/group-marks-form.component';
import { GroupMarksStudentDetailComponent } from './group-marks-children/group-marks-student-detail/group-marks-student-detail.component';
import { GroupStudentListComponent } from './group-marks-children/group-student-list/group-student-list.component';
import { GroupMarksComponent } from './group-marks-parent/group-marks.component';
import { HttpClient } from '@angular/common/http';
import { TeacherRoutingModule } from '@app/teacher-module/routes/teacher.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/commons/shared.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '@app/header/header.module';

@NgModule({
  declarations: [
    GroupMarksComponent,
    GroupStudentListComponent,
    GroupMarksStudentDetailComponent,
    GroupMarksFormComponent
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
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    GroupMarksComponent,
    GroupStudentListComponent,
    GroupMarksStudentDetailComponent,
    GroupMarksFormComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MarksModuleModule { }
