import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Student } from 'app/models/Student';
import { MarkService } from 'app/services/mark.service';
import { Mark } from 'app/models/Mark';
import { Lesson } from 'app/models/Lesson';
import { map } from 'rxjs-compat/operator/map';
import { LessonService } from 'app/services/lesson.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-marks-student-detail',
  templateUrl: './group-marks-student-detail.component.html',
  styleUrls: ['./group-marks-student-detail.component.scss']
})
export class GroupMarksStudentDetailComponent implements OnInit, OnChanges {

  @Input('selectedMarks')
  selectedMarks: Mark[];

  @Input('student')
  student: Student;

  // marks to be displayed after filtering action.
  marksToDisplay: Mark[];

  // All lessons of the current group to be displayed in filter buttons.
  lessons: Lesson[];

  constructor(private markService: MarkService, private lessonService: LessonService, private translate: TranslateService) { }

  ngOnInit() {
    this.marksToDisplay = this.selectedMarks;
    if (this.student.group && this.student.group.id) {
      this.findLessonsByGroupId(this.student.group.id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.marks != null) {
      this.selectedMarks = changes.marks.currentValue;
      this.marksToDisplay = this.selectedMarks;
    }
    if (changes.student != null) {
      this.student = changes.student.currentValue;
      this.marksToDisplay = this.selectedMarks;
    }
  }

  refresh(student: Student) {
    this.markService.findAll(student.id, _.undefined)
    .then(marks =>
     { 
        this.selectedMarks = marks
        this.onFilterByLesson(null);
     });
  }

  public onFilterByLesson(lesson: Lesson) {
    if (lesson == null) {
      this.marksToDisplay = this.selectedMarks;
    } else {
      this.marksToDisplay = this.markService.filterLessons(this.selectedMarks, lesson);
    }
  }

  private findLessonsByGroupId(groupId: string) {
    this.lessonService.findAll(_.undefined, groupId)
      .then(lessons => this.lessons = lessons)
      .then(lessons => console.log(lessons))
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
}
