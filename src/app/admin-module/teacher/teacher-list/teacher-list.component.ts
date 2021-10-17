import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from '@app/services/teacher.service';

import { Teacher } from '@app/models/Teacher.model';
import { BASE_URL } from '@app/app.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Routers } from '@app/admin-module/routes/router-link';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  APP_TEACHER_PROFILE: string = Routers.APP_TEACHER_PROFILE;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  errorMessage: string;

  teachers: Teacher[] = [];

  dataSource = new MatTableDataSource<Teacher>(this.teachers);
  displayedColumns: string[] = ['photo', 'firstName', 'lastName', 'phone', 'description'];

  isLoading = false;

  constructor(private teachersService: TeacherService) { }

  ngOnInit() {
    this.findAllTeachers();
  }

  async findAllTeachers() {
    this.isLoading = true;
    try {
      this.teachers = await this.teachersService.findAll();
      this.refershPaginator();
    } finally {
      this.isLoading = false;
    }
  }

  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Teacher>(this.teachers);
    this.dataSource.paginator = this.paginator;
  }
}
