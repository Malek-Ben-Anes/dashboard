import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';

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

  ngOnInit() {console.log("start new component");}

  onStudentSelected(student: Student) {
    this.studentSelected = student;
  }
}

