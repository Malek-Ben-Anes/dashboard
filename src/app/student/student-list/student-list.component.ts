import { Component, OnInit, OnDestroy } from '@angular/core';



import { Router } from '@angular/router';
import { Subscription, of, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { BASE_URL } from 'app/app.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  BASE_URL: string = BASE_URL;

  studentsSubscription: Subscription;
  students: Student[] = [];

  constructor(private studentsService: StudentService, private router: Router) {}

  ngOnInit() {
    this.studentsSubscription = this.studentsService.studentsSubject.subscribe(
      (students: any[]) => {
        this.students = students;
        console.log(this.students);
      }
    );
    this.studentsService.emitStudentSubject();
  }

  ngOnDestroy() {
    this.studentsSubscription.unsubscribe();
  }
}
