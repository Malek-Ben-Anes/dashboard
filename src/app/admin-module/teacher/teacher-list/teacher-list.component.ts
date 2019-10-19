import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'app/services/teacher.service';

import { Teacher } from 'app/models/Teacher';
import { BASE_URL } from 'app/app.component';
import { Gender } from 'app/models/User';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  errorMessage: string;

  teachers: Teacher[] = [];

  constructor(private teachersService: TeacherService, private translate: TranslateService) { }

  ngOnInit() {
    this.findAllTeachers();
  }
  
  findAllTeachers(): void {
    this.teachersService.findAll().then(teachers => this.teachers = teachers)
    .catch(error => this.errorMessage = `${error.status}: ${error.error.message}`);
    // .catch(error => this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`);
  }

  getPhoto(gender: Gender): string {
    if(gender !=null) {
      return `assets/images/teacher-${gender.toLowerCase}.png`;
    }
    return 'assets/images/profile-logo.png';
  }
}
