import {Component, OnInit, OnDestroy} from '@angular/core';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import {User} from '@app/models/User';
import {AuthService} from '@app/services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedUserSubscription: Subscription;
  isLogged = false;
  loggedUser: User;
  roles: string[];

  showMenuItems = false;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.loggedUserSubscription = this.authService.getUser().subscribe((loggedUser) => this.loggedUser = loggedUser);
      this.authService.emitUserSubject();
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  ngOnDestroy() {
    this.loggedUserSubscription.unsubscribe();
  }

  showBar() {
    this.showMenuItems = !this.showMenuItems;
    console.log(this.showMenuItems);
  }
}
