import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private roles: string[];
  id: string;
  username: string;
  authority: string;
  photo: string;
  navBar = [];
  // To be displayed in navbar
  role: string;
  newNotifications: number;

AdminNavBar = [
  {'router': '/students', 'label': 'Eleves' },
  {'router': '/teachers', 'label': 'Enseignants' },
  {'router': '/subjects', 'label': 'Programme' },
  {'router': '/groups', 'label': 'Classes' }];
// {'router': '/lessons', 'label': 'Lessons' },
// {'router': '/marks', 'label': 'Notes' }
// {'router': '/site-vitrine', 'label': 'Page Vitrine' }

teacherNavBar = [{'router': '/marks', 'label': 'Marks' },
{'router': '/lessons', 'label': 'Lessons' }];

studentNavBar = [{'router': '/marks', 'label': 'Marks' },
{'router': '/bulletin', 'label': 'Bulletin' }];


  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getId();
      this.username = this.tokenStorage.getUsername();
      this.photo = this.tokenStorage.getUserPhoto();
      const userNotif: string = this.tokenStorage.getUserNewNotifications();
      this.newNotifications = _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : parseInt(userNotif);
      console.log(this.newNotifications, userNotif);      
      this.roles = this.tokenStorage.getAuthorities();


      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'Admin';
          this.navBar = this.AdminNavBar;
          this.role = 'Admin';
          return false;
        } else if (role === 'ROLE_TEACHER') {
          this.authority = 'Teacher';
          this.role = 'Teacher';
          this.navBar = this.teacherNavBar;
          return false;
        }
        this.authority = 'Student';
        this.role = '';
        this.navBar = this.studentNavBar;
        return true;
      });
    }
    console.log(this.authority);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigate(['auth/login'])
  }
}
