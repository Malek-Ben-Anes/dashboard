import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Student } from '@app/models/Student.model';
import { MarkService } from '@app/services/mark.service';
import { Mark } from '@app/models/Mark';
import { Lesson } from '@app/models/Lesson';
import { LessonService } from '@app/services/lesson.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-marks-student-detail',
  templateUrl: './group-marks-student-detail.component.html',
  styleUrls: ['./group-marks-student-detail.component.scss']
})
export class GroupMarksStudentDetailComponent implements OnInit, OnChanges {

  @Input('student')
  student: Student;

  @Input('lessons')
  lessons: Lesson[];

  // marks to be displayed after filtering action.
  marksToDisplay: Mark[];

  constructor(private cdRef:ChangeDetectorRef,
              private lessonService: LessonService,
              private markService: MarkService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.marksToDisplay = this.student && this.student.marks;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student != null) {
      this.student = changes.student.currentValue;
      this.marksToDisplay = this.student && this.student.marks;
    }
  }

  public onFilterByLesson(lesson: Lesson) {
    if (lesson == null) {
      this.marksToDisplay = this.student && this.student.marks;
    } else {
      this.marksToDisplay = this.markService.filterLessons(this.student && this.student.marks, lesson);
    }
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

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

}
