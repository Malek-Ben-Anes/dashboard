import { NgModule } from "@angular/core";
import { ImagePreloadDirective } from "./image-preload/image-preload.directive";
import { AvatarComponent } from "@app/commons/avatar/avatar.component";
import { MaterialModule } from "@app/material.module";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";
import { DialogContentExampleDialogComponent } from "./dialog-content-example-dialog/dialog-content-example-dialog.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { MatProgressSpinnerModule } from "@angular/material";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ToastrModule } from "ngx-toastr";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PinnedButtonComponent } from "./pinned-button/pinned-button.component";
@NgModule({
  declarations: [
    ImagePreloadDirective,
    AvatarComponent,
    ImagePreloadDirective,
    DialogContentExampleDialogComponent,
    ErrorDialogComponent,
    PinnedButtonComponent,
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

    ToastrModule.forRoot(),
    DragDropModule,
    ScrollDispatchModule,
    MatProgressSpinnerModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ScrollDispatchModule,
  ],
  exports: [
    ImagePreloadDirective,
    AvatarComponent,
    ImagePreloadDirective,
    DialogContentExampleDialogComponent,
    ErrorDialogComponent,
    PinnedButtonComponent,
  ],
})
export class SharedModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
