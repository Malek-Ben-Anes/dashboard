import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'app/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  username: string;
  authority: string;
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername();
      console.log(this.roles);
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    console.log(this.authority);
  }

  logout() {
    console.log("ok");
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigate(['auth/login'])
  }
}
