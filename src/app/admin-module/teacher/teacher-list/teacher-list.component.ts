import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherService } from 'app/services/teacher.service';

import { Teacher } from 'app/models/Teacher';
import { BASE_URL } from 'app/app.component';
import { Gender } from 'app/models/User';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  errorMessage: string;

  teachers: Teacher[] = [];

  dataSource = new MatTableDataSource<Teacher>(this.teachers);
  displayedColumns: string[] = ['photo', 'firstname', 'lastname', 'email', 'phone', 'description'];

  isLoading = false;

  constructor(private teachersService: TeacherService, private translate: TranslateService) { }

  ngOnInit() {
    this.findAllTeachers();
  }
  
  findAllTeachers(): void {
    this.isLoading = true;
    this.teachersService.findAll().subscribe(teachers => {this.teachers = teachers; this.refershPaginator()},
    error => this.errorMessage = `${error.status}: ${error.error.message}`,
    () => this.isLoading = false);
  }

  getPhoto(gender: Gender): string {
    if(gender !=null) {
      return `assets/images/teacher-${gender.toLowerCase}.png`;
    }
    return 'assets/images/profile-logo.png';
  }


  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Teacher>(this.teachers);
    this.dataSource.paginator = this.paginator;
  }
}
