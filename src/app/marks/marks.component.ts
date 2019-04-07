import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Group } from 'app/models/Group';
import { MarkService } from 'app/services/mark.service';
import { Student } from 'app/models/Student';
import { Mark } from 'app/models/Mark';
import { StudentService } from 'app/services/student.service';

import { TokenStorageService } from 'app/auth/token-storage.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarkComponent implements OnInit {

  //https://hackernoon.com/chatbot-with-angular-5-dialogflow-fdac97fef681
  students: Student[];
  groupSelected: Group;
  studentSelected: Student;
  marks: Mark[]; // by student Id

  loggedStudent: Student;

  authority: string;
  authId: string;
  private roles: string[];

  constructor(private tokenStorage: TokenStorageService, private markService: MarkService, private studentService: StudentService) {}  

  ngOnInit() {
    this.getAuthority();
   }

  onGroupSelected(group: Group) {
    this.groupSelected = group;
    // get all group students 
    this.getStudents(this.groupSelected.id);
  }

  onStudentSelected(student: Student) {
    this.studentSelected = student;
  }

  private getStudents(id: string): void {
    this.studentService.getGroupStudents(id)
      .subscribe(students => this.students = students,
        err => console.log(err.error));
  }

  private getAuthority() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.authId = this.tokenStorage.getId();
      console.log(this.roles);
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        const studentById: Student = this.studentService.getSingleStudent(this.authId);
        if (studentById != null) {
          this.loggedStudent = studentById;
        }
        return true;
      });
    
      console.log("user role");}
    console.log(this.authority);
  }
}

