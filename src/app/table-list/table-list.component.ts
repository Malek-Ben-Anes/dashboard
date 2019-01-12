import { Component, OnInit, OnDestroy } from '@angular/core';



import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeacherService } from 'app/services/teacher.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Teacher } from 'app/models/Teacher';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnDestroy {


  teachers: Teacher[] = [];
  teachersSubscription: Subscription;

  constructor(private teachersService: TeacherService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    console.log("ngoninit");

    this.teachersSubscription = this.teachersService.teacherSubject.subscribe(
      (teachers) => {
        this.teachers = teachers;
        this.teachersService.emitTeachers();
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }
  ngOnDestroy() {
    this.teachersSubscription.unsubscribe();
  }
}
