import {Component, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';

import {Teacher} from '@app/models/Teacher.model';
import {BASE_URL} from '@app/app.component';
import {Gender} from '@app/models/enums/Gender';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {Routers} from '@app/admin-module/routes/router-link';

@Component({
  selector: 'app-notif-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
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

  findAllTeachers(): void {
    this.isLoading = true;
    this.teachersService.findAll().subscribe((teachers) => {
      this.teachers = teachers; this.refershPaginator();
    },
    (error) => this.errorMessage = `${error.status}: ${error.error.message}`,
    () => this.isLoading = false);
  }

  getPhoto(gender: Gender): string {
    if (gender !=null) {
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
