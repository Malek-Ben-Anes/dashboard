import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/services/auth/auth.service';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { AuthLoginInfo } from '@app/services/auth/login-info';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage;
  roles: string[] = [];
  isLogging: boolean = false;
  hide = true;

  constructor(private authService: AuthService, private translate: TranslateService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  async ngOnInit() {
    this.isLoggedIn = await this.tokenStorage.getIsLoggedUser();
    if (this.isLoggedIn) {
      this.navigateToLoggedUser();
    } else {
      this.router.navigate(['app', 'auth', 'login']);
    }
  }

  async onSignIn() {
    if (!this.email.valid || !this.password.valid) return;
    const loginInfo = new AuthLoginInfo(this.email.value, this.password.value);
    try {
      this.isLogging = false;
      await this.authService.signIn(loginInfo);
      this.isLoggedIn = true;
      window.location.reload();
    } catch (err) {
      this.displayErrorMessage(err);
    } finally {
      this.isLogging = false;
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

  private async displayErrorMessage(err?: HttpErrorResponse) {
    this.isLoginFailed = true;
    this.isLogging = false;
    this.errorMessage = await this.translate.instant('signIn.credentials.failure');
    setTimeout(() => {
      this.errorMessage = undefined;
    }, 4000);
  }

  logout() {
    window.location.reload();
    this.tokenStorage.signOut();
    this.authService.saveLoggedUser(null);
    this.authService.saveIsLoggedUser(false);
  }
}
