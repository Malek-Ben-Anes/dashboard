import { Component, OnInit, Input } from '@angular/core';
import { Trimester } from 'app/models/Trimester';
import { Student } from 'app/models/Student';
import { FileUploadService } from 'app/services/file-upload.service';

@Component({
  selector: 'app-bulletin-upload',
  templateUrl: './bulletin-upload.component.html',
  styleUrls: ['./bulletin-upload.component.scss']
})
export class BulletinUploadComponent implements OnInit {

  @Input('student') student: Student;
  
  selectedFile: File
  isUploading: boolean=false;
  trimesters = Object.keys(Trimester);
  

  constructor(private fileUploadService: FileUploadService) { }

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
