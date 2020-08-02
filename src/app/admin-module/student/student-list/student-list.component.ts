import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BASE_URL } from 'app/app.component';
import { Routers } from 'app/admin-module/routes/router-link';
import { TranslateService } from '@ngx-translate/core';
import { StudentFilter } from './student-filter/student-filter.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  BASE_URL = BASE_URL;
  STUDENT_PROFILE: string = Routers.APP_STUDENT_PROFILE;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  // This variable is needed retrieving data from server
  students: Student[] = [];

  // This variable is needed for filter functionnality
  studentsTmp: Student[] = [];

  dataSource = new MatTableDataSource<Student>(this.studentsTmp);
  displayedColumns: string[] = ['photo', 'firstname', 'lastname', 'email', 'groupName'];

  isLoading = false;

  constructor(private studentsService: StudentService) { }

  ngOnInit() {
    this.isLoading = true;
    this.studentsService.getStudents().subscribe(
      (students: any[]) => {
        this.students = students;
        this.studentsTmp = students;
        this.refershPaginator();
        console.log(this.students);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      }, () => this.isLoading = false);
  }

  refreshStudents(filter: StudentFilter) {
    this.isLoading = true;
    if (filter != null) {
      this.studentsTmp = this.studentsService.filter(this.students, filter);
    } else {
      this.studentsTmp = this.students;
    }
    this.refershPaginator();
  }

  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Student>(this.studentsTmp);
    this.dataSource.paginator = this.paginator;
  }

}
