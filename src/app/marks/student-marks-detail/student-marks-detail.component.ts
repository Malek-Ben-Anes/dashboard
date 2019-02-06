import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { Mark } from 'app/models/Mark';
import { MarkService } from 'app/services/mark.service';

@Component({
  selector: 'app-student-marks-detail',
  templateUrl: './student-marks-detail.component.html',
  styleUrls: ['./student-marks-detail.component.scss']
})
export class StudentMarksDetailComponent implements OnInit {


  @Input('student') student: Student;

  // student marks to be retrieved from markService
  marks: Mark[] = []; 

  constructor(private markService: MarkService) { }

  ngOnInit() {
    this.markService.getStudentMarks(this.student.id).subscribe(marks => { this.marks = marks; console.log(this.marks); });
  }

}
