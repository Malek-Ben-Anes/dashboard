import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { HttpResponse } from '@angular/common/http';
import { Student } from 'app/models/Student';
import { Trimester } from 'app/models/Trimester';
import { FileUploadService } from 'app/services/file-upload.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {

  @Input('student') student: Student;
  selectedTrimester: Trimester = Trimester.TRIMESTER1;

  @Output()
  modifiedStudent = new EventEmitter<Student>();

  authority: string;
  authId: string;
  selectedFile: File
  isUploading = false;
  trimesters = Object.keys(Trimester);
  private roles: string[];

  constructor(private fileService: FileUploadService,
              private translate: TranslateService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.fileService.uploadBulletin(this.student.id, this.selectedTrimester, this.selectedFile)
    .subscribe((response: HttpResponse<Student>) => {
      this.isUploading = true;
      if (response.type === 4) {
        this.isUploading = false;
        this.student = response.body;
        console.log(this.student)
      }
    }, err => {
      alert('bulletin uploaded est echoué');
      this.isUploading = false;
    });
  }

  onDeleteBulletin(event, bulletinId: string) {
    event.currentTarget.disabled = true;
    this.fileService.deleteBulletin(bulletinId).subscribe();
  }
}
