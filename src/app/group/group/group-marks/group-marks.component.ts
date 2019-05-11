import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { TokenStorageService } from 'app/auth/token-storage.service';
import { MarkService } from 'app/services/mark.service';
import { StudentService } from 'app/services/student.service';
import { Mark } from 'app/models/Mark';

@Component({
  selector: 'app-group-marks',
  templateUrl: './group-marks.component.html',
  styleUrls: ['./group-marks.component.scss']
})
export class GroupMarksComponent implements OnInit {
  // https://hackernoon.com/chatbot-with-angular-5-dialogflow-fdac97fef681

  @Input('group') group: Group;
  studentSelected: Student;

  constructor() {}
  ngOnInit() {}

  onStudentSelected(student: Student) {
    this.studentSelected = student;
  }
}

