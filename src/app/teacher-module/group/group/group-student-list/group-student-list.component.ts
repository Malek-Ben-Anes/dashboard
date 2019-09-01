import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { RouterLink } from 'app/admin-module/admin.routing';


@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.scss']
})
export class GroupStudentListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  STUDENT_PROFILE: string = RouterLink.APP_STUDENT_PROFILE;

  @Input('students') students: Student[];

  constructor() { }

  ngOnInit() {
  }

}
