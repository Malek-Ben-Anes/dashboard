import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Student } from 'app/models/Student';
import { MarkService } from 'app/services/mark.service';
import { Mark } from 'app/models/Mark';
import { Lesson } from 'app/models/Lesson';
import { map } from 'rxjs-compat/operator/map';
import { LessonService } from 'app/services/lesson.service';

@Component({
  selector: 'app-group-marks-student-detail',
  templateUrl: './group-marks-student-detail.component.html',
  styleUrls: ['./group-marks-student-detail.component.scss']
})
export class GroupMarksStudentDetailComponent implements OnInit, OnChanges {

  @Input('student') student: Student;

  // All lessons of the current group to be displayed in filter buttons.
  lessonsOfCurrentGroup: Lesson[];

  // marks to be displayed after filtering action.
  marksToDisplay: Mark[];

  constructor(private markService: MarkService, private lessonService: LessonService) { }

  ngOnInit() {
    this.getAllMarksByStudentId(this.student.id);
    this.findLessonsByGroupId(this.student.group.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student != null) {
      this.student = changes.student.currentValue;
      this.getAllMarksByStudentId(this.student.id);
      this.findLessonsByGroupId(this.student.group.id);
    }
  }

  refresh(student: Student) {
    this.student = student;
    this.onFilterByLesson(null);
  }

  onFilterByLesson(lesson: Lesson) {
    if (lesson == null) {
      this.marksToDisplay = [...this.student.marks];
    } else {
      this.marksToDisplay = [..._.filter<Mark[]>(this.student.marks, mark => _.isEqual(mark.lesson, lesson))];
    }
  }

  private findLessonsByGroupId(groupId: string) {
    this.lessonService.findAll()
        .then(lessons => this.lessonsOfCurrentGroup = _.filter(lessons, (lesson: Lesson) => lesson.id.groupId === groupId))
        .catch(err => console.log(err));
  }

  private getAllMarksByStudentId(studentId: string) {
    this.markService.findAllByStudentId(studentId)
      .then(marks => this.student.marks = _.sortBy(marks, ['createdAt', 'updatedAt']).reverse())
      .then(marks => this.marksToDisplay = this.student.marks)
      .catch(err => console.log(err));
  }

  getMarkStyle(mark) {
    if (mark <= 10) {
      return 'red-color';
    } else if (mark > 10 && mark <= 15) {
      return 'blue-color';
    } else {
      return 'green-color';
    }
  }

  /*displayLessons(): string[] {
    return _.chain(this.lessonsOfCurrentGroup).map('subjectName').uniqBy().value();
  }*/
}
