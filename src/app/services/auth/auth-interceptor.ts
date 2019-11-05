import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { catchError, tap, retry } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { ErrorDialogService } from './error-dialog.service';
import { DialogData } from 'app/models/DialogData';
import { TranslateService } from '@ngx-translate/core';

const CROS_ORIGIN_KEY = 'Access-Control-Allow-Origin';
const TOKEN_HEADER_KEY = 'Authorization';
const CONTENT_TYPE_KEY = 'Content-Type';
const ACCEPT_KEY = 'Accept';
const MULTIPART_FILE = 'multipart/form-data'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private storage: TokenStorageService, private auth: AuthService, private errorDialogService: ErrorDialogService,
                private toasterService: ToastrService,
                private translate: TranslateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storage.getToken();
        if (token != null) {
            request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
        }
        if (!request.headers.has(CONTENT_TYPE_KEY)) {
            request = request.clone({ headers: request.headers.set(CONTENT_TYPE_KEY, 'application/json') });
        } else if (request.headers.get(CONTENT_TYPE_KEY).includes(MULTIPART_FILE)) {
            // 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            // THIS IS A WORK AROUND FOR UPLOAD MULITPART REQUEST ISSUE
            request = request.clone({ headers: request.headers.delete(CONTENT_TYPE_KEY)});
        }
        if (!request.headers.has(CROS_ORIGIN_KEY)) {
            request = request.clone({ headers: request.headers.set(CROS_ORIGIN_KEY, '*') });
        }
        request = request.clone({ headers: request.headers.set(ACCEPT_KEY, '*/*') });
        return next.handle(request).pipe(
            tap(),
            retry(1),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // this.auth.collectFailedRequest(request);
                        const data: DialogData = {
                            dialogTitle: err && err.error.message ? this.translate.instant('All.text.sessionExpired') : '',
                            dialogMessage: ''
                        };
                        if (this.storage.getToken()) {
                            this.errorDialogService.openDialog(data);
                            this.storage.signOut();
                            setTimeout(() => window.location.reload(), 3000);
                        }
                        return throwError(err);
                    }
                }
                return of(err);
            }));
    }
}

/*
    ERROR HANDLER

    
  private errorHandler(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log(err.error);
      console.log("Client-side error occured.");
    } else {
      console.log(err.error);
      console.log("Server-side error occured.");
    }
  }
*/

/* TOASTER
if (evt instanceof HttpResponse) {
    if(evt.body && evt.body.success)
        this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
    }
 if(err instanceof HttpErrorResponse) {
    try {
            this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
        } catch(e) {
            this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
        }
}


userAPI(data): Observable<any> {
  return this.http.post(this.baseurl, data, httpOptions)
    .pipe(
      tap((result) => console.log('result-->',result)),
      catchError(this.handleError('error', []))
    );
}*/