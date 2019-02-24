import { Component, OnInit } from '@angular/core';



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
export class StudentListComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  students: Student[] = [];

  constructor(private studentsService: StudentService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getStudents();
  }
  
  getStudents(): void {
    this.studentsService.getStudents()
        .subscribe(students => this.students = students, 
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
