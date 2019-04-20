import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';

import { BASE_URL } from 'app/app.component';
import { FileUploadService } from 'app/services/file-upload.service';
import { User } from 'app/models/User';
import { Student } from 'app/models/Student';
import { Teacher } from 'app/models/Teacher';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  @Input('user') user: Teacher | Student;

  selectedFile: File
  isUploading = false;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {}


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    if ( this.user.discriminatorValue === 'STUDENT') {
      this.uploadStudentImage(this.user.id, this.selectedFile);
    } else if (this.user.discriminatorValue === 'TEACHER') {
      // TODO modify to teacher
      this.uploadStudentImage(this.user.id, this.selectedFile);
    }
  }

  private uploadStudentImage (id: string, file: File) {
    this.fileUploadService.uploadFile(id, this.selectedFile).subscribe(HttpResponse => {
      this.isUploading = true;
      console.log(HttpResponse);
      if (HttpResponse.type === 4) {
        if (HttpResponse['body'] !== undefined) {
          if (HttpResponse['body']['photo'] !== undefined) {
            console.log('photo updated');
            this.user.photo = HttpResponse['body']['photo'];
            this.isUploading = false;
          }
        }
      }
    });
  }

  getProfile(): string {
    if ( this.user.discriminatorValue === 'STUDENT') {
      return 'Student Profile';
    } else if ( this.user.discriminatorValue === 'TEACHER') {
      return 'Teacher Profile';
    }
    return 'Student Profile';
  }
}
