import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupStudentListComponent implements OnInit {

  @Input('students') students: Student[];

  @Output() studentSelected = new EventEmitter<Student>();

  BASE_URL: string = BASE_URL;

  constructor() { }

  ngOnInit() {}

  onDetailMarks(student: Student): void {
    this.studentSelected.emit(student);
    console.log(student);
  }
}