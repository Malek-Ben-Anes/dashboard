import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  // This variable is needed retrieving data from server
  students: Student[] = [];
  // This variable is needed for filter functionnality
  studentsTmp: Student[] = [];

  constructor(private studentsService: StudentService, private router: Router) { }

  ngOnInit() {
    this.studentsService.getStudents().subscribe(
      (students: any[]) => {
        this.students = students;
        this.studentsTmp = students;
        console.log(this.students);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      });
  }

  refreshStudents(students: Student[] | undefined) {
    if (students === undefined) {
      this.studentsTmp = this.students;
    } else {
      this.studentsTmp = students;
    }
  }

}
