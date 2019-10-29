import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { TeacherRouterLink } from '../../../routes/router-link';

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.scss']
})
export class GroupStudentListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  APP_STUDENT_PROFILE: string = TeacherRouterLink.APP_STUDENT_PROFILE;

  @Input('students') students: Student[];

  constructor() { }

  ngOnInit() {
  }

}
