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
    tabIndex = {'PROFILE': 0, 'PASSWORD': 1, 'MARKS': 2, 'BULLETIN': 3, 'TIME_TABLE': 4};
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
    const student = this.studentService.getSingleStudent(id);
    if (student != null) {
      this.student = student;
        this.isNew = false;
        console.log(this.student);
    }
  }
}
