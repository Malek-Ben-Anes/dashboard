import { NgModule } from '@angular/core';
import { ImagePreloadDirective } from './image-preload/image-preload.directive';
import { AvatarComponent } from 'app/avatar/avatar.component';
import { MaterialModule } from 'app/material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'app/app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    ImagePreloadDirective,
    AvatarComponent,
    ImagePreloadDirective,
    DialogContentExampleDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,

    ToastrModule,
    DragDropModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ScrollDispatchModule,
  ],
  exports: [
    ImagePreloadDirective,
    AvatarComponent,
    ImagePreloadDirective,
    DialogContentExampleDialogComponent,
    ErrorDialogComponent
  ],
})
export class SharedModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}