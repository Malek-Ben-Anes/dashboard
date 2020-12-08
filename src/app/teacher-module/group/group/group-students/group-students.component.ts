import { Component, OnInit, Input } from '@angular/core';
import { Student } from '@app/models/Student.model';
import { BASE_URL } from '@app/app.component';
import { TeacherRouterLink } from '../../../routes/router-link';

@Component({
  selector: 'app-group-students',
  templateUrl: './group-students.component.html',
  styleUrls: ['./group-students.component.scss']
})
export class GroupStudentsComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  APP_STUDENT_PROFILE: string = TeacherRouterLink.APP_STUDENT_PROFILE;

  @Input('students') students: Student[];

  constructor() { }

  ngOnInit() {
  }

}
