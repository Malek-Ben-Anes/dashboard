import {Component, OnInit} from '@angular/core';
import {Student} from '@app/models/Student.model';

@Component({
  selector: 'app-group-marks',
  templateUrl: './group-marks.component.html',
  styleUrls: ['./group-marks.component.scss'],
})
export class GroupMarksComponent implements OnInit {
  studentSelected: Student;

  constructor() {}

  ngOnInit() {
  }

  onStudentSelected(student: any) {
    this.studentSelected = student;
  }
}
