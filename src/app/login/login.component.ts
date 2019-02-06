import { Component, OnInit } from '@angular/core';

import * as jwt_decode from "jwt-decode";

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  isLogging: boolean = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    console.log(this.form);

    this.isLogging = true;

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {

        let tokenInfo = this.getDecodedAccessToken(data.accessToken); // decode token
        // console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(tokenInfo.name);
        this.tokenStorage.saveAuthorities(tokenInfo.authorities);


        let expireDate = tokenInfo.exp; // get token expiration dateTime
        console.log(tokenInfo); // show decoded token object in console

        this.isLogging = false;

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();  
        this.router.navigate(['dashboard']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.isLogging = false;
      }
    );
  }

  logout() {
    window.location.reload();
    this.tokenStorage.signOut();
  }

  reloadPage() {
    window.location.reload();
    
  }

  // Decode JWT token
  private getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
      console.log(Error.message);
        return null;
    }
  }
}
