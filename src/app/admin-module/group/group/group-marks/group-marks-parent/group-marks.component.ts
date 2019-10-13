import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { MarkService } from 'app/services/mark.service';
import { Mark } from 'app/models/Mark';
import { LessonService } from 'app/services/lesson.service';
import { Lesson } from 'app/models/Lesson';

@Component({
  selector: 'app-group-marks',
  templateUrl: './group-marks.component.html',
  styleUrls: ['./group-marks.component.scss']
})
export class GroupMarksComponent implements OnInit {
  // https://hackernoon.com/chatbot-with-angular-5-dialogflow-fdac97fef681

  @Input('group') group: Group;
  studentSelected: Student;

  marks: Mark[];
  selectedMarks: Mark[];

  lessons: Lesson[];
  lessonsOfCurrentGroup: Lesson[];

  constructor(private markService: MarkService, private lessonService: LessonService) {}

  ngOnInit() {
    this.markService
    .findAll(undefined, this.group.id)
    .then(marks => 
      {
        this.marks = marks; console.log(this.marks);
        if (this.group.students) {
          this.onStudentSelected(this.group.students[0])
        }
      }
     );
  }

  onStudentSelected(student: Student) {
    this.studentSelected = student;
    this.selectedMarks = this.markService.filterMarks(this.marks, student.id);
    console.log(this.selectedMarks);
  }
}

