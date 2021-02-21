import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ErrorDialogService} from './error-dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogData} from '@app/models/DialogData';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly CROS_ORIGIN_KEY = 'Access-Control-Allow-Origin';
  private readonly TOKEN_HEADER_KEY = 'Authorization';
  private readonly CONTENT_TYPE_KEY = 'Content-Type';
  private readonly ACCEPT_KEY = 'Accept';
  private readonly MULTIPART_FILE = 'multipart/form-data';

  constructor(private errorDialogService: ErrorDialogService,
              private storage: TokenStorageService,
              private translate: TranslateService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.prepareRequest(request))
        .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                const data: DialogData = {
                  dialogTitle: error.error.message ? this.translate.instant('All.text.sessionExpired') : '',
                  dialogMessage: '',
                };
                if (this.storage.getToken()) {
                  this.errorDialogService.openDialog(data);
                  this.storage.signOut();
                  setTimeout(() => window.location.reload(), 3000);
                }
                return throwError(error);
              }
              let errorMsg = '';
              if (error.error instanceof ErrorEvent) {
                console.log('this is client side error');
                errorMsg = `Error: ${error.message}`;
              } else {
                console.log('this is server side error');
                errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
              }
              return throwError(errorMsg);
            }),
        );
  }

  private prepareRequest(request): any {
    const token = this.storage.getToken();
    if (token != null) {
      request = request.clone({headers: request.headers.set(this.TOKEN_HEADER_KEY, `Bearer ${token}`)});
    }
    if (!request.headers.has(this.CONTENT_TYPE_KEY)) {
      request = request.clone({headers: request.headers.set(this.CONTENT_TYPE_KEY, 'application/json')});
    } else if (request.headers.get(this.CONTENT_TYPE_KEY).includes(this.MULTIPART_FILE)) {
      request = request.clone({headers: request.headers.delete(this.CONTENT_TYPE_KEY)});
    }
    if (!request.headers.has(this.CROS_ORIGIN_KEY)) {
      request = request.clone({headers: request.headers.set(this.CROS_ORIGIN_KEY, '*')});
    }
    request = request.clone({headers: request.headers.set(this.ACCEPT_KEY, '*/*')});
    return request;
  }
}
