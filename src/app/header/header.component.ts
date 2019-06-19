import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { Router } from '@angular/router';
import { RouterLink } from 'app/app.routing';

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
  ROUTER_LINK: RouterLink;

  AdminNavBar = [
    { 'router': '/app/students', 'label': 'header.students' },
    { 'router': '/app/teachers', 'label': 'header.teachers' },
    { 'router': '/app/subjects', 'label': 'header.program' },
    { 'router': '/app/groups', 'label': 'header.groups' }];

  teacherNavBar = [{ 'router': '/app/marks', 'label': 'header.marks' },
  { 'router': '/app/lessons', 'label': 'Lessons' }];

  studentNavBar = [{ 'router': '/app/marks', 'label': 'header.marks' },
  { 'router': '/app/bulletin', 'label': 'header.bulletins' }];

  landingPageNavBar = [{ 'href': 'index.html', 'label': 'header.accueil' },
  { 'href': 'notre-ecole/index.html', 'label': 'header.aboutUs' },
  { 'href': 'clubs/index.html', 'label': 'header.clubs' },
  { 'href': 'contact/index.html', 'label': 'header.contact' }];

  constructor(private tokenStorage: TokenStorageService, private router: Router, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.id = this.tokenStorage.getId();
      this.username = this.tokenStorage.getUsername();
      this.photo = this.tokenStorage.getUserPhoto();
      const userNotif: string = this.tokenStorage.getUserNewNotifications();
      this.newNotifications = _.isNil(userNotif) || _.isNaN(userNotif) ? 0 : parseInt(userNotif, 10);
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

  switchLanguage(language: string) {
    console.log(language);    
    this.translate.use(language);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigate(['/app/auth/login'])
  }
}
