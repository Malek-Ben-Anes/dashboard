import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders as AngularHttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvService} from './env.service';

export class HttpHeaders extends AngularHttpHeaders {

}

@Injectable({
  providedIn: 'root',
})
export class WebServiceNTLMInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('ipstack')) {
      req = req.clone({
        withCredentials: true,

      },
      );
    }

    return next.handle(req);
  }
}

@Injectable()
export class HttpService {
  constructor(
    protected httpClient: HttpClient,
    protected envService: EnvService,
  ) {
  }

  public async get<T>(url: string, headers: HttpHeaders = null, responseType: any = 'json') {
    const result = await this.getObservable<T>(url, headers, responseType).toPromise();
    return result;
  }

  public getObservable<T>(url: string, headers: HttpHeaders = null, responseType: any = 'json'): Observable<T> {
    const result = this.httpClient.get<T>(url, {headers: headers, responseType: responseType});
    return result;
  }


  public async post<T>(url: string, body: any, headers: HttpHeaders = null, responseType: any = 'json') {
    const result = this.postObservable<T>(url, body, headers, responseType).toPromise();
    return result;
  }

  public postObservable<T>(url: string, body: any, headers: HttpHeaders = null, responseType: any = 'json'): Observable<T> {
    const result = this.httpClient.post<T>(url, body, {withCredentials: true, headers: headers, responseType: responseType});
    return result;
  }

  public async put<T>(url: string, body: any, headers: HttpHeaders = null, responseType: any = 'json') {
    const result = this.httpClient.put<T>(url, body, {withCredentials: true, headers: headers, responseType: responseType}).toPromise();
    return result;
  }

  public async delete<T>(url: string, headers: HttpHeaders = null, responseType: any = 'json') {
    await this.httpClient.delete(url, {headers: headers, responseType: responseType}).toPromise();
  }
}
