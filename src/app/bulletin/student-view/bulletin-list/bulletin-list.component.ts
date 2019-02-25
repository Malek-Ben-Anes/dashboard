import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { FileUploadService } from 'app/services/file-upload.service';



@Component({
  selector: 'app-bulletin-list',
  templateUrl: './bulletin-list.component.html',
  styleUrls: ['./bulletin-list.component.scss']
})
export class BulletinListComponent implements OnInit {
  
  BASE_URL = BASE_URL;

  @Input('student') student: Student;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit() {
  }

  onDeleteBulletin(bulletinId:number) {
    console.log(bulletinId);
    this.fileUploadService.deleteBulletin(bulletinId).subscribe(data => console.log(data));
  }

}
