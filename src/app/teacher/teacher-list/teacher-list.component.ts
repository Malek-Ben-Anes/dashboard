import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router';
import { Subscription, of, Subject } from 'rxjs';
import { TeacherService } from 'app/services/teacher.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Teacher } from 'app/models/Teacher';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {


  teachers: Teacher[] = [];
  teachersSubscription: Subscription;

  constructor(private teachersService: TeacherService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getTeachers();
  }
  
  getTeachers(): void {
    this.teachersService.getTeachers()
        .subscribe(teachers => this.teachers = teachers, 
          (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log("Client-side error occured.");
              } else {
                console.log("Server-side error occured.");
              }
            }
          );
  }
}
