import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import * as jwt_decode from "jwt-decode";

import { JwtResponse, JwtTokenResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { BASE_API_URL } from '@app/app.component';
import { User } from '@app/models/User';
import { TokenStorageService } from './token-storage.service';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const LOGIN_URL = BASE_API_URL + 'auth/sign_in';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new Subject<User>();
  private isLoggedUser: boolean;
  private _loggedUser: User;
  private role: string[];
  private jwtResponse: JwtResponse;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  signIn(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtTokenResponse>(LOGIN_URL, credentials, httpOptions)
            .pipe(map((jwtToken: JwtTokenResponse) =>
            {
              this.saveLoggedUserIntoStorage(jwtToken.token);
              return jwtToken.token;
            }));
  }

  // TODO remove promise @Deprecated
  public getLoggedUser(): Promise<User> {
    if (this._loggedUser == null) {
      this._loggedUser = this.tokenStorage.getLoggedUser();
    }
    return new Promise((resolve, reject) => this._loggedUser ? resolve(this._loggedUser) : reject(this._loggedUser));
  }

  public saveLoggedUser(loggedUser: User) {
    this._loggedUser = loggedUser;
  }

  public saveNewNotifications(newNotifications: number) {
    this._loggedUser.newNotifications = newNotifications;
    this.tokenStorage.saveUserNewNotifications(`${newNotifications}`);
  }

  public emitUserSubject() {
    this._loggedUser = this.tokenStorage.getLoggedUser();
    this.subject.next(this._loggedUser);
  }

  save(user: User) {
    this._loggedUser = user;
    this.tokenStorage.saveLoggedUser(this._loggedUser);
    this.subject.next(this._loggedUser);
  }

  getUser(): Observable<User> {
    return this.subject.asObservable();
  }

  public getIsLoggedUser(): boolean {
    if (this.isLoggedUser) {
      return this.isLoggedUser;
    }
    this.isLoggedUser = this.tokenStorage.getIsLoggedUser();
    return this.isLoggedUser;
  }

  public saveIsLoggedUser(isLoggedUser: boolean) {
    this.isLoggedUser = isLoggedUser;
  }

  public getUserRole(): string[] {
    if (this.role) {
      return this.role;
    }
    this.role = this.tokenStorage.getAuthorities();
    return this.role;
  }

  public saveUserRole(role: string[]) {
    this.role = role;
  }

  private saveLoggedUserIntoStorage(encodedJwtResponseAccessToken: any): User {
    this.tokenStorage.saveToken(encodedJwtResponseAccessToken);
    const JwtTokenInfo: JwtResponse = this.getDecodedAccessToken(encodedJwtResponseAccessToken);
    this.jwtResponse = JwtTokenInfo;
    this.tokenStorage.saveIsLoggedUser(true);
    this.tokenStorage.saveUsername(JwtTokenInfo.user.firstName);
    this.tokenStorage.saveAuthorities(JwtTokenInfo.authorities);
    this.tokenStorage.saveId(JwtTokenInfo.user && JwtTokenInfo.user.id);
    this.tokenStorage.saveGender(JwtTokenInfo.user && JwtTokenInfo.user.gender);
    this.tokenStorage.saveUserPhoto(JwtTokenInfo.user && JwtTokenInfo.user.photo);
    this.tokenStorage.saveUserNewNotifications(String(JwtTokenInfo.user.newNotifications));
    this.tokenStorage.saveLoggedUser(JwtTokenInfo.user);
    this.save(JwtTokenInfo.user);
    this.saveIsLoggedUser(true);
    return JwtTokenInfo.user;
  }

  // Decode JWT token
  private getDecodedAccessToken(token: any): JwtResponse {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      console.log(Error.message);
      return null;
    }
  }

  cachedRequests: Array<HttpRequest<any>> = [];
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}