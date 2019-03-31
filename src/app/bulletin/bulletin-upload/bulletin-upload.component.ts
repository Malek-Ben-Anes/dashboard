import { Component, OnInit, Input } from '@angular/core';
import { Trimester } from 'app/models/Trimester';
import { Student } from 'app/models/Student';
import { FileUploadService } from 'app/services/file-upload.service';
import { BulletinService } from 'app/services/bulletin.service';

@Component({
  selector: 'app-bulletin-upload',
  templateUrl: './bulletin-upload.component.html',
  styleUrls: ['./bulletin-upload.component.scss']
})
export class BulletinUploadComponent implements OnInit {

  @Input('student') student: Student;

  selectedFile: File
  isUploading = false;
  trimesters = Object.keys(Trimester);

  selectedTrimester: Trimester = Trimester.TRIMESTER1;

  constructor(private bulletinService: BulletinService) { }

  ngOnInit() {}

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.bulletinService.uploadBulletin(this.student.id, this.selectedTrimester, this.selectedFile).subscribe(HttpResponse => {
      this.isUploading = true;
      console.log(HttpResponse);
      if (HttpResponse.type === 4) {
       this.isUploading = false;
       alert('bulletin uploaded');
       setTimeout(() => (window.location.reload()), 1000);
      }
    }, err => {
      alert('bulletin uploaded est echoué');
      this.isUploading = false;
    });
  }
}
