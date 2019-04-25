import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';

@Component({
  selector: 'app-group-detail-student-list',
  templateUrl: './group-detail-student-list.component.html',
  styleUrls: ['./group-detail-student-list.component.scss']
})
export class GroupDetailStudentListComponent implements OnInit {

  @Input('students') students: Student[];

  constructor() { }

  ngOnInit() {
  }

}
