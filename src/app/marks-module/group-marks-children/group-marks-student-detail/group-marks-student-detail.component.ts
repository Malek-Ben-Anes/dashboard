import * as _ from 'lodash';
import {Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {MarkService} from '@app/services/mark.service';
import {Mark} from '@app/models/Mark';
import {Lesson} from '@app/models/Lesson.model';
import {LessonService} from '@app/services/lesson.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-group-marks-student-detail',
  templateUrl: './group-marks-student-detail.component.html',
  styleUrls: ['./group-marks-student-detail.component.scss'],
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
    if (this.currentGroup) {
      this.findMarks(this.currentGroup.id);
      this.findLessons(this.currentGroup.id, this.teacherId);
    }
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

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  private findMarks(groupId: string, student?: Student) {
    this.markService
        .findAll(undefined, groupId)
        .then((groupMarks) => {
          this._groupMarks = groupMarks;
          if (this.currentGroup && this.currentGroup.students) {
            this.onStudentSelected(null );/* student || this.group.students[0]*/
          }
        },
        );
  }

  private get teacherId(): string {
    // const user: User = this.storage.getLoggedUser();
    return 'TEACHER';// user.discriminatorValue == 'TEACHER' ? user.id : _.undefined;
  }

  private findLessons(groupId: string, teacherId: string = _.undefined) {
    this.lessonService.findAll(teacherId, groupId)
        .subscribe((lessons) => this.lessons = lessons);
  }

  onStudentSelected(student: Student) {
    if (student) {
      student.marks = this.markService.filterMarks(this._groupMarks, student.id);
      this.studentSelected = Object.assign({}, student);
    }
  }

  refresh(student: Student) {
    this.findMarks(this.currentGroup.id, student);
  }
}
