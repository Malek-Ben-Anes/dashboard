import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { Routers } from 'app/admin-module/routes/router-link';

@Component({
  selector: 'app-group-detail-student-list',
  templateUrl: './group-detail-student-list.component.html',
  styleUrls: ['./group-detail-student-list.component.scss']
})
export class GroupDetailStudentListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  STUDENT_PROFILE: string = Routers.APP_STUDENT_PROFILE;

  @Input('students') students: Student[];

  constructor() { }

  ngOnInit() {
  }

}
