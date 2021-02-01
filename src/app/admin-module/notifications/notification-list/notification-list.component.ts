import {Component, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';

import {Teacher} from '@app/models/Teacher.model';
import {BASE_URL} from '@app/app.component';
import {Gender} from '@app/models/enums/Gender';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {Routers} from '@app/admin-module/routes/router-link';
import {User} from '@app/models/User';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';

@Component({
  selector: 'app-notif-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  BASE_URL: string = BASE_URL;
  APP_TEACHER_PROFILE: string = Routers.APP_TEACHER_PROFILE;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  errorMessage: string;

  teachers: Teacher[] = [];

  dataSource = new MatTableDataSource<Teacher>(this.teachers);
  displayedColumns: string[] = ['Title', 'Content', 'Notifier', 'Date'];

  isLoading = false;
  currentUser: User;

  constructor(private authService: AuthService, private notificationService: NotificationService, private teachersService: TeacherService) { }

  ngOnInit() {
    this.authService.getLoggedUser().then((user) => {
      this.currentUser = user;
      this.findAllTeachers();
    });
  }

  findAllTeachers(): void {
    this.isLoading = true;
    this.teachersService.findAll().subscribe((teachers) => {
      this.teachers = teachers;
      this.refershPaginator();
    },
    (error) => this.errorMessage = `${error.status}: ${error.error.message}`,
    () => this.isLoading = false);
  }


  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Teacher>(this.teachers);
    this.dataSource.paginator = this.paginator;
  }
}
