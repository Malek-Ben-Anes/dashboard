import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { BASE_URL } from '@app/app.component';
import { Student } from '@app/models/Student.model';
import { Trimester } from '@app/models/Trimester';
import { FileUploadService } from '@app/services/file-upload.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  @Input('student') student: Student;
  selectedTrimester: Trimester = Trimester.TRIMESTER1;

  @Output()
  modifiedStudent = new EventEmitter<Student>();

  authority: string;
  authId: string;
  selectedFile: File
  isUploading = false;
  trimesters = Object.keys(Trimester);

  constructor(private fileService: FileUploadService,
              private translate: TranslateService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.fileService.uploadBulletin(this.student.id, this.selectedTrimester, this.selectedFile)
    .then((student: Student) => {
      this.isUploading = true;
        this.isUploading = false;
        this.student = student;
      }
    ).catch( err => {
      alert('bulletin uploaded est echoué');
      this.isUploading = false;
    });
  }

  onDeleteBulletin(event, bulletinId: string) {
    event.currentTarget.disabled = true;
    this.fileService.deleteBulletin(bulletinId).subscribe();
  }
}
