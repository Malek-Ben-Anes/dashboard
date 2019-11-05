import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
export class RouterLink  {
    public static AUTH_LOGIN =  'auth/login';
}

const routes: Routes = [
    {
        path: 'app',
        redirectTo: `app/${RouterLink.AUTH_LOGIN}`,
        pathMatch: 'full'
    },
    {
        path: `app/${RouterLink.AUTH_LOGIN}`,
        component: LoginComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'app/**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule {}

