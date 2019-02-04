import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';

@Component({
  selector: 'app-student-marks-detail',
  templateUrl: './student-marks-detail.component.html',
  styleUrls: ['./student-marks-detail.component.scss']
})
export class StudentMarksDetailComponent implements OnInit {


  @Input('student') students: Student;

  constructor() { }

  ngOnInit() {
  }

}
