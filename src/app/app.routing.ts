import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {PatchPasswordComponent} from './patch-password/patch-password.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
export class RouterLink {
    public static AUTH_LOGIN = 'auth/login';
    public static PASSWORD_UPDATE = 'update-user-password';
}

const routes: Routes = [
  {
    path: 'app',
    redirectTo: `app/${RouterLink.AUTH_LOGIN}`,
    pathMatch: 'full',
  },
  {
    path: `app/${RouterLink.AUTH_LOGIN}`,
    component: LoginComponent,
  },
  {
    path: `app/${RouterLink.PASSWORD_UPDATE}`,
    canActivate: [AuthGuardService],
    component: PatchPasswordComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'app/**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
})
export class AppRoutingModule {}

