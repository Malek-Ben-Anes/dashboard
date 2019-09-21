import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
export class RouterLink  {
    public static AUTH_LOGIN =  'auth/login';
}

const routes: Routes = [
    {
        path: '',
        redirectTo: `app/${RouterLink.AUTH_LOGIN}`,
        pathMatch: 'full'
    },
    {
      path: 'app',
      component: ContentComponent,
      children: [
        {
            path: RouterLink.AUTH_LOGIN,
            component: LoginComponent
        },
        // { path: 'not-found', component: FourOhFourComponent },
        { path: '**', redirectTo: 'not-found' }
      ]
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

