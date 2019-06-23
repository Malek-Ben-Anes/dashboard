import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { User } from 'app/models/User';
import { AuthService } from 'app/services/auth/auth.service';

var notifications = {'notifsNumber' : 0 };


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  loggedUser: User;
  roles: string[];

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.loggedUser = this.tokenStorage.getLoggedUser();
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
}
