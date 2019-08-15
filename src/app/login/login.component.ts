import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { AuthLoginInfo } from 'app/services/auth/login-info';
import { JwtResponse } from 'app/services/auth/jwt-response';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {

    this.isLoggedIn = this.tokenStorage.getIsLoggedUser();
    if (this.isLoggedIn) {
      this.router.navigate(['app', 'students']);
    } else {
      this.router.navigate(['app', 'auth', 'login']);
    }
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    this.isLogging = true;
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).then(
      (jwtResponseInfo: JwtResponse) => {
        this.isLogging = false;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      })
      .catch(err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLogging = false;
      });
  }

  logout() {
    window.location.reload();
    this.tokenStorage.signOut();
    this.LogoutUserInAuthService();
  }

  private LogoutUserInAuthService(): void {
    this.authService.saveLoggedUser(null);
    this.authService.saveIsLoggedUser(false);
  }

  reloadPage() {
    window.location.reload();
  }
}
