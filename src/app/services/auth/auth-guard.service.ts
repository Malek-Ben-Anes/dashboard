import * as _ from 'lodash';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.authService.getUserRole());
    if (this.authService.getIsLoggedUser() && _.some(this.authService.getUserRole(), next.data.role) ) {
      return true;
    } else if(this.authService.getIsLoggedUser()) {
      this.router.navigate(['auth', 'login']);
      return false
    } else {
      // this.router.navigate(['/404']);
      this.router.navigate(['auth', 'login']);
      return false;  
    }
  }
}
