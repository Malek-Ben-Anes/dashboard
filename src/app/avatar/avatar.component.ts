import { Component, OnInit, Input } from '@angular/core';

import { BASE_URL } from 'app/app.component';
import { FileUploadService } from 'app/services/file-upload.service';
import { Student } from 'app/models/Student';
import { Teacher } from 'app/models/Teacher';
import { HttpClient } from '@angular/common/http';

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

  constructor(private fileUploadService: FileUploadService, private http: HttpClient) { }

  ngOnInit() {}


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.uploadStudentImage(this.user, this.selectedFile);
  }

  private uploadStudentImage (user: Student| Teacher, file: File) {


    const formData = new FormData();
        formData.append('file', this.selectedFile);
        console.log('avatar');
        const options =  {headers:       { 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        // 'Content-Type': 'multipart/form-data;  boundary=----WebKitFormBoundaryJ6Q2VG5TMUfGoSqg'
      }};
        this.http.post('http://localhost:8091/api/students/', formData, options)
          .subscribe(res => {
            console.log(res);
            // this.uploadedFilePath = res.data.filePath;
            alert('SUCCESS !!');
          }, err => console.log('err'))


    /*this.fileUploadService.uploadUserPhoto(user, file).subscribe(HttpResponse => {
      this.isUploading = true;
      console.log('********', HttpResponse.type, file);
      if (HttpResponse.type === 4) {
        if (HttpResponse['body'] !== undefined) {
          if (HttpResponse['body']['photo'] !== undefined) {
            console.log('photo updated');
            this.user.photo = HttpResponse['body']['photo'];
            this.isUploading = false;
          }
        }
      }
    }, err => console.log('err', err));*/
  }

  get profile(): string {
    if ( this.user.discriminatorValue === 'TEACHER') {
      return 'teacher';
    }
    return 'student';
  }
}
