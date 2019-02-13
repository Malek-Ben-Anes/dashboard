import { Injectable } from '@angular/core';
import { User, Gender } from 'app/models/User';

const TOKEN_KEY = 'AuthToken';
const ID_KEY = 'AuthId';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const GENDER_KEY = 'AuthGender';
const PHOTO_KEY = 'AuthPhoto';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
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
    window.sessionStorage.setItem(GENDER_KEY, gender);
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
}
