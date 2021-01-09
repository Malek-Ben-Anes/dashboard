import {Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {MarkService} from '@app/services/mark.service';
import {Mark} from '@app/models/Mark.model';
import {Lesson} from '@app/models/Lesson.model';
import {LessonService} from '@app/services/lesson.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Group} from '@app/models/Group.model';
import {GroupService} from '@app/services/group.service';

@Component({
  selector: 'app-group-marks-student-detail',
  templateUrl: './group-marks-student-detail.component.html',
  styleUrls: ['./group-marks-student-detail.component.scss'],
})
export class GroupMarksStudentDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input('student')
  student: Student;

  _subscription: Subscription;
  currentGroup: Group;

  allLessons: Lesson[];

  allMarks: Mark[];
  // marks to be displayed after filtering action.
  studentMarks: Mark[];

  constructor(private groupService: GroupService,
              private lessonService: LessonService,
              private markService: MarkService,
              private translate: TranslateService) { }

  ngOnInit() {
    this._subscription = this.groupService.getGroup().subscribe((group) => {
      this.currentGroup = group;
      if (group) {
        this.findLessons(this.currentGroup.id);
        this.findMarks(this.currentGroup.id);
      }
    });
  }

  private findLessons(groupId: string) {
    this.lessonService.findAll(undefined, groupId).subscribe((lessons) => this.allLessons = lessons);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.student && changes.student.currentValue) {
      this.student = changes.student.currentValue;
      this.filterMarks(this.student.id);
    }
    if (this.currentGroup) {
      this.findLessons(this.currentGroup.id);
      this.findMarks(this.currentGroup.id);
    }
  }

  filterMarks(studentId: string) {
    this.studentMarks = this.allMarks.filter((mark: Mark) => mark.studentId == studentId);
  }

  onSelectLesson(lesson: Lesson) {
    console.log(lesson);
  }

  onSelectWeek(week: Lesson) {
    console.log(week);
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

  private findMarks(groupId: string, student?: Student) {
    this.markService.findAll(undefined, this.currentGroup.id).subscribe((marks) => this.allMarks = marks);
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
