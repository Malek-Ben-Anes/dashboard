import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';

@Component({
  selector: 'app-group-marks-student-list',
  templateUrl: './group-marks-student-list.component.html',
  styleUrls: ['./group-marks-student-list.component.scss']
})
export class GroupMarksStudentListComponent implements OnInit {

  @Input('students') students: Student[];

  @Output() studentSelected = new EventEmitter<Student>();

  BASE_URL: string = BASE_URL;

  constructor() { }

  ngOnInit() {
    if (this.students.length > 0) {
      this.studentSelected.emit(this.students[0]);
    }
  }

  onDetailMarks(student: Student): void {
    this.studentSelected.emit(student);
  }
}
