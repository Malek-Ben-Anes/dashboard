import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Student } from 'app/models/Student';
import { Mark } from 'app/models/Mark';
import { MarkService } from 'app/services/mark.service';

@Component({
  selector: 'app-student-view-mark-detail',
  templateUrl: './mark-detail.component.html',
  styleUrls: ['./mark-detail.component.scss']
})
export class MarkDetailComponent implements OnInit {

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

  getMarkStyle(mark) {
    if (mark <= 10) {
      return 'red-color';
    } else if (mark > 10 && mark <= 15) {
      return 'blue-color';
    } else {
      return 'green-color';
    }
  }

  private getStudentsMarks() {
    this.markService.getStudentMarks(this.student.id).subscribe(marks => { this.marks = marks; console.log(this.marks); });
  }
}
