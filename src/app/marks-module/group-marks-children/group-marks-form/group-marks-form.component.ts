import * as _ from 'lodash';
import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {Lesson} from '@app/models/Lesson.model';
import {Mark} from '@app/models/Mark.model';
import {MarkService} from '@app/services/mark.service';
import {TranslateService} from '@ngx-translate/core';
import {CreateMarkRequest} from '@app/models/requests/mark/CreateMark.model';
import { Group } from '@app/models/Group.model';
import { UpdateMarkRequest } from '@app/models/requests/mark/UpdateMark.model';

@Component({
  selector: 'app-group-marks-form',
  templateUrl: './group-marks-form.component.html',
  styleUrls: ['./group-marks-form.component.scss'],
})
export class GroupMarksFormComponent implements OnInit, OnChanges {
  @Input()
  student: Student;

  @Input()
  group: Group;

  @Input()
  lessons: Lesson[];

  newEvaluationMarks: Mark[];
  studentMarks: Mark[];
  isLoading = false;

  constructor(private markService: MarkService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.updateForms(this.lessons);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student && changes.student.currentValue) {
      this.student = changes.student.currentValue;
      this.updateForms(this.lessons);
    }
  }

  private async updateForms(lessons: Lesson[]) {
    this.isLoading = true;
    await this.markService.findAllPromise(this.student.id)
        .then((marks: Mark[]) => {
          this.studentMarks = marks;
        }, (err) => this.isLoading = false );

    const formEntries: Mark[] = [];
    if (lessons) {
      lessons.forEach((lesson) => {
        const existingMark: Mark = _.chain(this.studentMarks)
            .filter((mark) => mark.subjectId === lesson.subject.id && mark.teacherId === lesson.teacher.id && mark.updatable)
            .first()
            .value();
        if (existingMark) {
          formEntries.push(existingMark);
        } else {
          formEntries.push(this.buildMark(lesson));
        }
      });
    }
    this.newEvaluationMarks = formEntries;
    this.isLoading = false;
  }

  private buildMark(lesson: Lesson): Mark {
    const mark = new Mark();
    mark.groupId = lesson.group.id;
    mark.teacherId = lesson.teacher.id;
    mark.teacherName = lesson.teacher.name;
    mark.studentId = this.student.id;
    mark.subjectId = lesson.subject.id;
    mark.subjectName = lesson.subject.name;
    mark.updatable = true;
    return mark;
  }

  onSave(event, mark: Mark) {
    // If mark exists then update else persist
    if (mark.id) {
      const request: UpdateMarkRequest = new UpdateMarkRequest(mark.mark, mark.observation);
      this.markService.update(mark.id, request).then((data) => this.updateForms(this.lessons));
    } else {
      const request: CreateMarkRequest = new CreateMarkRequest(mark);
      this.markService.save(request).then((data) => this.updateForms(this.lessons));
    }
  }

  onDeleteMark(event, mark: Mark) {
    event.currentTarget.disabled = true;
    this.markService.delete(mark.id).then((data) => data);
  }
}
