import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

import { JwtResponse, jwtToken } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { BASE_API_URL } from 'app/app.component';
import { User } from 'app/models/User';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const LOGIN_URL = BASE_API_URL + 'auth/signin';
const SIGN_UP_URL = BASE_API_URL + 'auth/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedUser: boolean;
  private loggedUser: User;
  private jwtResponse: JwtResponse;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  attemptAuth(credentials: AuthLoginInfo): Promise<JwtResponse> {
    return new Promise((resolve, reject) => {
      // This query result is a JWT encoded response.
      this.http.post<jwtToken>(LOGIN_URL, credentials, httpOptions)
        .subscribe(jwtToken => {
          const accessToken = jwtToken.accessToken;
          this.saveLoggedUserIntoStorage(accessToken);

          resolve(this.jwtResponse);
        }, err => reject(err));
    });
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(SIGN_UP_URL, info, httpOptions);
  }

  public getLoggedUser(): Promise<User> {
    if (this.loggedUser == null) {
      this.loggedUser = this.tokenStorage.getLoggedUser();
    }
    return new Promise( (resolve, reject) => this.loggedUser ? resolve(this.loggedUser) : reject(this.loggedUser));
  }

  public saveLoggedUser(loggedUser: User) {
    this.loggedUser = loggedUser;
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

  private saveLoggedUserIntoStorage(encodedJwtResponseAccessToken: any): void {
    this.tokenStorage.saveToken(encodedJwtResponseAccessToken);
    const JwtTokenInfo: JwtResponse = this.getDecodedAccessToken(encodedJwtResponseAccessToken);
    this.jwtResponse = JwtTokenInfo;
    this.tokenStorage.saveIsLoggedUser(true);
    this.tokenStorage.saveUsername(JwtTokenInfo.name);
    this.tokenStorage.saveAuthorities(JwtTokenInfo.authorities);
    this.tokenStorage.saveId(JwtTokenInfo.user.id);
    this.tokenStorage.saveGender(JwtTokenInfo.user.gender);
    this.tokenStorage.saveUserPhoto(JwtTokenInfo.user.photo);
    this.tokenStorage.saveUserNewNotifications(String(JwtTokenInfo.user.newNotifications));
    this.tokenStorage.saveLoggedUser(JwtTokenInfo.user);
    this.saveLoggedUser(JwtTokenInfo.user);
    this.saveIsLoggedUser(true);
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
}