import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { FileUploadService } from 'app/services/file-upload.service';
import { TokenStorageService } from 'app/auth/token-storage.service';



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

  constructor(private tokenStorage: TokenStorageService, private fileUploadService: FileUploadService) { }

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

  onDeleteBulletin(event, bulletinId: number) {    

    event.currentTarget.disabled = true;
    this.fileUploadService.deleteBulletin(bulletinId).subscribe();
  }
}
