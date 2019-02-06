import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Student } from 'app/models/Student';
import { Mark } from 'app/models/Mark';
import { MarkService } from 'app/services/mark.service';

@Component({
  selector: 'app-student-marks-detail',
  templateUrl: './student-marks-detail.component.html',
  styleUrls: ['./student-marks-detail.component.scss']
})
export class StudentMarksDetailComponent implements OnInit, OnChanges {


  @Input('student') student: Student;

  // student marks to be retrieved from markService
  marks: Mark[] = [];

  constructor(private markService: MarkService) { }

  ngOnInit() {
    this.getStudentsMarks();
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.student = changes.student.currentValue;
    console.log("student in child value changed");
    console.log(this.student);
    this.getStudentsMarks();
  }

  private getStudentsMarks() {
    this.markService.getStudentMarks(this.student.id).subscribe(marks => { this.marks = marks; console.log(this.marks); });
  }
}
