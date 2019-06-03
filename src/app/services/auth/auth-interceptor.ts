import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { ErrorDialogService } from './error-dialog.service';
import { DialogData } from 'app/models/DialogData';

const TOKEN_HEADER_KEY = 'Authorization';
const CONTENT_TYPE_KEY = 'Content-Type';
const ACCEPT_KEY = 'Accept';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private toasterService: ToastrService, private token: TokenStorageService, private auth: AuthService, private errorDialogService: ErrorDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.token.getToken();
        if (token != null) {
            request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
        }
        if (!request.headers.has(CONTENT_TYPE_KEY)) {
            request = request.clone({ headers: request.headers.set(CONTENT_TYPE_KEY, 'application/json') });
        }
        request = request.clone({ headers: request.headers.set(ACCEPT_KEY, 'application/json') });

        return next.handle(request).pipe(
            tap(evt => {
                console.log("success");
                if (evt instanceof HttpResponse) {
                    if (evt.body && evt.body.success) {
                        // this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
                    }
                }
            }),
            retry(1),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // this.auth.collectFailedRequest(request);
                        let data: DialogData = {
                            dialogTitle: err && err.error.message ? err.error.message : '',
                            dialogMessage: '' + err.status
                        };
                        this.errorDialogService.openDialog(data);
                        return throwError(err);
                    }
                }
                return of(err);
            }));
    }
}

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
}*/