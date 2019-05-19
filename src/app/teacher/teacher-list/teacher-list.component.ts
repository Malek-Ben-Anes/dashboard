import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { Subscription, of, Subject } from 'rxjs';
import { TeacherService } from 'app/services/teacher.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Teacher } from 'app/models/Teacher';
import { BASE_URL } from 'app/app.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  teachers: Teacher[] = [];
  teachersSubscription: Subscription;

  constructor(private teachersService: TeacherService) { }

  ngOnInit() {
    this.findAllTeachers();
  }
  
  findAllTeachers(): void {
    this.teachersService.findAll().then(teachers => this.teachers = teachers)
    .catch(err => console.log(err));
  }
}
