import * as _ from 'lodash';
import {Component, OnInit, Input} from '@angular/core';
import {Group} from '@app/models/Group';
import {Student} from '@app/models/Student.model';
import {MarkService} from '@app/services/mark.service';
import {Mark} from '@app/models/Mark';
import {LessonService} from '@app/services/lesson.service';
import {Lesson} from '@app/models/Lesson.model';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorageService} from '@app/services/auth/token-storage.service';

@Component({
  selector: 'app-group-marks',
  templateUrl: './group-marks.component.html',
  styleUrls: ['./group-marks.component.scss'],
})
export class GroupMarksComponent implements OnInit {
  // https://hackernoon.com/chatbot-with-angular-5-dialogflow-fdac97fef681

  @Input('group') group: Group;

  // selected student
  student: Student = new Student();

  lessons: Lesson[];

  _groupMarks: Mark[];

  constructor(private markService: MarkService,
              private lessonService: LessonService,
              private translate: TranslateService,
              private storage: TokenStorageService) {}

  ngOnInit() {
    this.findMarks(this.group.id);
    this.findLessons(this.group.id, this.teacherId);
  }

  private findMarks(groupId: string, student?: Student) {
    this.markService
        .findAll(undefined, groupId)
        .then((groupMarks) => {
          this._groupMarks = groupMarks;
          if (this.group && this.group.students) {
            this.onStudentSelected(student || this.group.students[0]);
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
      this.student = Object.assign({}, student);
    }
  }

  refresh(student: Student) {
    this.findMarks(this.group.id, student);
  }
}
