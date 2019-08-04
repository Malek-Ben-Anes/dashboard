import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.scss']
})
export class GroupStudentListComponent implements OnInit {

  @Input('students') students: Student[];
  BASE_URL: string = BASE_URL;

  constructor() { }

  ngOnInit() {
  }

}
