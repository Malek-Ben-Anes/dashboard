import {Component, Input, OnInit} from '@angular/core';
import { Group } from '@app/models/Group.model';
import { Lesson } from '@app/models/Lesson.model';
import { Student } from '@app/models/Student.model';
import { LessonService } from '@app/services/lesson.service';

@Component({
  selector: 'app-group-marks',
  templateUrl: './group-marks.component.html',
  styleUrls: ['./group-marks.component.scss'],
})
export class GroupMarksComponent implements OnInit {

  @Input('showForm')
  showForm: boolean;

  @Input()
  group: Group;

  student: Student;

  lessons: Lesson[];

  constructor(private lessonSerivce: LessonService) {}

  ngOnInit() {
    this.lessonSerivce.search(undefined, this.group.id).then((lessons) => {
      this.lessons = lessons;
    });
  }

  async onStudentSelected(event) {
    this.student = event;
  }
}
