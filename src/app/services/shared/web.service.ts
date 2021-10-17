import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EnvService} from './env.service';
import {HttpHeaders, HttpService} from './http.service';

export interface WebServiceInterface {
  get<T>(path, getParams): Promise<T>;
  getObservable<T>(path, getParams): Observable<T>;

  post<T>(path, body, getParams): Promise<T>;
  postObservable<T>(path, getParams): Observable<T>;

  put<T>(path, body, getParams): Promise<T>;

  delete<T>(path, getParams): Promise<void>;
}


@Injectable({
  providedIn: 'root',
})
export class WebService implements WebServiceInterface {
  constructor(
    protected httpService: HttpService,
    protected envService: EnvService,
  ) {
  }

  protected getParamsToString(path, getParams: {}) {
    let str = '';

    for (const index in getParams) {
      if (getParams.hasOwnProperty(index) && getParams[index]) {
        if (str === '') {
          str = '?';
        } else {
          str += '&';
        }
        str += index + '=' + getParams[index];
      }
    }
    return str;
  }

  public async get<T>(path, getParams = {}, headers: HttpHeaders = null, responseType: any = 'json') {
    const urlParams = this.getParamsToString(path, getParams);
    return await this.httpService.get<T>(this.envService.getServerUrl() + path + urlParams, headers, responseType);
  }

  public getObservable<T>(path, getParams = {}, headers: HttpHeaders = null, responseType: any = 'json') {
    const urlParams = this.getParamsToString(path, getParams);
    return this.httpService.getObservable<T>(this.envService.getServerUrl() + path + urlParams, headers, responseType);
  }

  public async post<T>(path, body, getParams = {}, headers: HttpHeaders = null, responseType: any = 'json') {
    const urlParams = this.getParamsToString(path, getParams);
    return await this.httpService.post<T>(this.envService.getServerUrl() + path + urlParams, body, headers, responseType);
  }
  public postObservable<T>(path, body, getParams = {}, headers: HttpHeaders = null, responseType: any = 'json') {
    const urlParams = this.getParamsToString(path, getParams);
    return this.httpService.postObservable<T>(this.envService.getServerUrl() + path + urlParams, body, headers, responseType);
  }

  public async put<T>(path, body, getParams = {}, headers: HttpHeaders = null, responseType: any = 'json') {
    const urlParams = this.getParamsToString(path, getParams);
    return await this.httpService.put<T>(this.envService.getServerUrl() + path + urlParams, body, headers, responseType);
  }

  public async delete<T>(path, getParams = {}, headers: HttpHeaders = null, responseType: any = 'json') {
    const urlParams = this.getParamsToString(path, getParams);
    return await this.httpService.delete<T>(this.envService.getServerUrl() + path + urlParams, headers, responseType);
  }
}
