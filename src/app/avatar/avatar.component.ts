import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/User';
import { Student } from 'app/models/Student';
import { FileUploadService } from 'app/services/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() student: Student;
  selectedFile: File
  isUploading: boolean=false;

  constructor(private fileUploadService: FileUploadService, private http: HttpClient) { }

  ngOnInit() {}


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.fileUploadService.uploadFile(this.student.id, this.selectedFile).subscribe(HttpResponse => {
      this.isUploading = true;

      console.log(HttpResponse);

      if (HttpResponse.type === 4) {
        if (HttpResponse['body'] !== undefined) {
          if (HttpResponse['body']['photo'] !== undefined) {
            console.log('photo updated');
            this.student.photo = HttpResponse['body']['photo'];
            this.isUploading=false;
          }
        }
      }
    });
  }
}
