import {Component, OnInit, Input} from '@angular/core';

import {BASE_URL} from '@app/app.component';
import {FileUploadService} from '@app/services/file-upload.service';
import {Student} from '@app/models/Student.model';
import {Teacher} from '@app/models/Teacher.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  BASE_URL: string = BASE_URL;

  @Input('user') user: Teacher | Student;

  selectedFile: File
  isUploading = false;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {}

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.isUploading = true;
    this.fileUploadService.uploadPhoto(this.user, this.selectedFile)
        .then((user) => {
          this.user = user; this.isUploading = false;
        })
        .catch((err) => {
          alert(err); this.isUploading = false;
        });
  }
}
