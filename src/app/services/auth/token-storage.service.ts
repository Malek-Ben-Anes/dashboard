import { Injectable } from '@angular/core';
import { User, Gender } from '@app/models/User';
import { Teacher } from '@app/models/Teacher';

const TOKEN_KEY = 'AuthToken';
const IS_LOGGED_USER_KEY = 'IsLoggedUser';
const LOGGED_USER_KEY = 'loggedUser';
const ID_KEY = 'AuthId';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const GENDER_KEY = 'AuthGender';
const PHOTO_KEY = 'AuthPhoto';
const NOTIFICATION_KEY = 'NewNotifications';
const LANGUAGE = 'language';

const TRUE = 'true';

// Todo rename tokenStorageService to storageService

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveIsLoggedUser(isLoggedUser: boolean) {
    window.sessionStorage.removeItem(IS_LOGGED_USER_KEY);
    window.sessionStorage.setItem(IS_LOGGED_USER_KEY, String(isLoggedUser));
  }

  public getIsLoggedUser(): boolean {
    return sessionStorage.getItem(IS_LOGGED_USER_KEY) === TRUE;
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveId(id: string) {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }

  public getId(): string {
    return sessionStorage.getItem(ID_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveGender(gender: Gender) {
    window.sessionStorage.removeItem(GENDER_KEY);
    window.sessionStorage.setItem(GENDER_KEY, String(gender));
  }

  public getGender(): string {
    return sessionStorage.getItem(GENDER_KEY);
  }

  public saveUserPhoto(photoUrl: string) {
    window.sessionStorage.removeItem(PHOTO_KEY);
    window.sessionStorage.setItem(PHOTO_KEY, photoUrl);
  }

  public getUserPhoto(): string {
    return sessionStorage.getItem(PHOTO_KEY);
  }

  public saveUserNewNotifications(newNotifications: string) {
    window.sessionStorage.removeItem(PHOTO_KEY);
    window.sessionStorage.setItem(NOTIFICATION_KEY, newNotifications);
  }

  public getUserNewNotifications(): string {
    return sessionStorage.getItem(NOTIFICATION_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public saveLoggedUser(authUser: User) {
    window.sessionStorage.removeItem(LOGGED_USER_KEY);
    window.sessionStorage.setItem(LOGGED_USER_KEY, JSON.stringify(authUser));
  }

  public getLoggedUser(): User {
    if (sessionStorage.getItem(LOGGED_USER_KEY)) {
      return JSON.parse(sessionStorage.getItem(LOGGED_USER_KEY));
    }
    return;
  }

  public saveLanguage(language: string) {
    window.sessionStorage.removeItem(LANGUAGE);
    window.sessionStorage.setItem(LANGUAGE, language);
  }

  public getLanguage(): string {
    return sessionStorage.getItem(LANGUAGE);
  }

  public isRtl(): boolean {
    return sessionStorage.getItem(LANGUAGE) === 'ar';
  }
}
