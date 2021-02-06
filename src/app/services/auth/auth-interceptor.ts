import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {catchError, tap, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from './auth.service';
import {ErrorDialogService} from './error-dialog.service';
import {DialogData} from '@app/models/DialogData';
import {TranslateService} from '@ngx-translate/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly CROS_ORIGIN_KEY = 'Access-Control-Allow-Origin';
  private readonly TOKEN_HEADER_KEY = 'Authorization';
  private readonly CONTENT_TYPE_KEY = 'Content-Type';
  private readonly ACCEPT_KEY = 'Accept';
  private readonly MULTIPART_FILE = 'multipart/form-data';

  constructor(private storage: TokenStorageService, private auth: AuthService, private errorDialogService: ErrorDialogService,
                private toasterService: ToastrService,
                private translate: TranslateService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getToken();
    if (token != null) {
      request = request.clone({headers: request.headers.set(this.TOKEN_HEADER_KEY, `Bearer ${token}`)});
    }
    if (!request.headers.has(this.CONTENT_TYPE_KEY)) {
      request = request.clone({headers: request.headers.set(this.CONTENT_TYPE_KEY, 'application/json')});
    } else if (request.headers.get(this.CONTENT_TYPE_KEY).includes(this.MULTIPART_FILE)) {
      // 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      // THIS IS A WORK AROUND FOR UPLOAD MULITPART REQUEST ISSUE
      request = request.clone({headers: request.headers.delete(this.CONTENT_TYPE_KEY)});
    }
    if (!request.headers.has(this.CROS_ORIGIN_KEY)) {
      request = request.clone({headers: request.headers.set(this.CROS_ORIGIN_KEY, '*')});
    }
    request = request.clone({headers: request.headers.set(this.ACCEPT_KEY, '*/*')});
    return next.handle(request).pipe(
        tap(),
        retry(2),
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              const data: DialogData = {
                dialogTitle: err && err.error.message ? this.translate.instant('All.text.sessionExpired') : '',
                dialogMessage: '',
              };
              if (this.storage.getToken()) {
                this.errorDialogService.openDialog(data);
                this.storage.signOut();
                setTimeout(() => window.location.reload(), 3000);
              }
              return throwError(err);
            }
            if (err.status > 299 && err. status < 200) {
              return throwError(err);
            }
          }
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
