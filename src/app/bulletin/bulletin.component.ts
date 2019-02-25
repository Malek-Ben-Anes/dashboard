import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from 'app/auth/token-storage.service';
import { Student } from 'app/models/Student';


@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {

  @Input('student') student: Student;

  

  authority: string;
  authId: string;
  private roles: string[];

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.getAuthority();
  }

  private getAuthority() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.authId = this.tokenStorage.getId();
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
  }
}