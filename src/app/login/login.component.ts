import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { AuthLoginInfo } from 'app/services/auth/login-info';
import { JwtResponse } from 'app/services/auth/jwt-response';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLogging: boolean = false;

  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private translate: TranslateService, private tokenStorage: TokenStorageService, private router: Router) {
    this.isLoggedIn = this.tokenStorage.getIsLoggedUser();
    if (this.isLoggedIn) {
      this.navigateToLoggedUser();
    } else {
      this.navigateToUnLoggedUser();
    }  
  }

  private navigateToLoggedUser() {
    this.roles = this.tokenStorage.getAuthorities();
    if (this.roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['app', 'students']);
    } else if (this.roles.includes('ROLE_TEACHER')) {
      this.router.navigate(['app', 'show-teacher-profile']);
    } else {
      this.router.navigate(['app', 'show-profile']);
    }
  }

  private navigateToUnLoggedUser() {
    this.router.navigate(['app', 'auth', 'login']);
  }

  onSignIn() {
    this.isLogging = true;
    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
          this.isLogging = false;
          this.isLoggedIn = true;
          this.reloadPage();
      }, err => {
          this.displayErrorMessage(err);
      }, () => { if(!this.isLoggedIn) this.displayErrorMessage();});
  }

  private displayErrorMessage(err?: HttpErrorResponse): void {
    this.isLoginFailed = true;
    this.isLogging = false;
    this.errorMessage = err ? err.error.message : this.translate.instant("signIn.credentials.failure");
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

  private reloadPage() {
    window.location.reload();
  }
}
