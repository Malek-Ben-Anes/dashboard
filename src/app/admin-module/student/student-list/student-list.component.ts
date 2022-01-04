import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '@app/models/Student.model';
import { StudentService } from '@app/services/student.service';
import { BASE_URL } from '@app/app.component';
import { Routers } from '@app/admin-module/routes/router-link';
import { StudentFilter } from './student-filter/student-filter.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
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
  displayedColumns: string[] = ['photo', 'firstName', 'lastName', 'email', 'groupName'];

  isLoading = false;

  constructor(private studentsService: StudentService) { }

  async ngOnInit() {
    this.isLoading = true;
    try {
      this.students = await this.studentsService.findAll();
      this.studentsTmp = this.students;
    } finally {
      this.isLoading = false;
    }
    this.refershPaginator();
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
