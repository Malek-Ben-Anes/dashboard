import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';

@Component({
  selector: 'app-group-detail-student-list',
  templateUrl: './group-detail-student-list.component.html',
  styleUrls: ['./group-detail-student-list.component.scss']
})
export class GroupDetailStudentListComponent implements OnInit {

  @Input('students') students: Student[];
  BASE_URL: string = BASE_URL;

  constructor() { }

  ngOnInit() {
  }

}
