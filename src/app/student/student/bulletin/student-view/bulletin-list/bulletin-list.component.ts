import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { TokenStorageService } from 'app/auth/token-storage.service';
import { BulletinService } from 'app/services/bulletin.service';



@Component({
  selector: 'app-bulletin-list',
  templateUrl: './bulletin-list.component.html',
  styleUrls: ['./bulletin-list.component.scss']
})
export class BulletinListComponent implements OnInit {

  BASE_URL = BASE_URL;
  @Input('student') student: Student;

  private roles: string[];
  authority: string;

  constructor(private tokenStorage: TokenStorageService, private bulletinService: BulletinService) { }

  ngOnInit() {
    this.roles = this.tokenStorage.getAuthorities();
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

  onDeleteBulletin(event, bulletinId: string) {
    event.currentTarget.disabled = true;
    this.bulletinService.deleteBulletin(bulletinId).subscribe();
  }
}
