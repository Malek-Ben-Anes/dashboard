import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  
    tabs = ['Edit Profile', 'Password', 'Marks', 'Bulletin', 'Time Table'];
    selected = new FormControl(0);

    isNew: boolean = true;

  student: Student = new Student();

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    if (id !== undefined) {
      console.log(id);
      this.getSingleStudent(id);
      
    } else {
      this.isNew = true;
    }
  }

  private getSingleStudent(id): void {
    this.studentService.getSingleStudent(id)
      .subscribe(student => {
        this.student = student;
        this.isNew = false;
        console.log(this.student);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }
}
