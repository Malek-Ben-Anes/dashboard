import * as _ from 'lodash';
import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {Lesson} from '@app/models/Lesson.model';
import {Mark} from '@app/models/Mark.model';
import {MarkService} from '@app/services/mark.service';
import {TranslateService} from '@ngx-translate/core';
import {LessonService} from '@app/services/lesson.service';
import {CreateMarkRequest} from '@app/models/requests/mark/CreateMark.model';
import { StudentService } from '@app/services/student.service';

@Component({
  selector: 'app-group-marks-form',
  templateUrl: './group-marks-form.component.html',
  styleUrls: ['./group-marks-form.component.scss'],
})
export class GroupMarksFormComponent implements OnInit, OnChanges {
  @Input('student') student: Student;

  lessons: Lesson[];
  newEvaluationMarks: Mark[] = [];
  studentMarks: Mark[] = [];
  isLoading = false;

  constructor(private markService: MarkService,
              private lessonSerivce: LessonService,
              private studentService: StudentService,
              private translate: TranslateService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.studentService.findById(this.student.id).then((student) => {
      this.student = student;
      this.isLoading = false;
    });
    this.retrieveLessons();
    this.retrieveMarks();
  }

  private buildMark(lesson: Lesson): Mark {
    const mark = new Mark();
    mark.isUpdatable = true;
    mark.groupId = lesson.group.id;
    mark.teacherId = lesson.teacher.id;
    mark.teacherName = lesson.teacher.name;
    mark.studentId = this.student.id;
    mark.subjectId = lesson.subject.id;
    mark.subjectName = lesson.subject.name;
    return mark;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student) {
      this.student = changes.student.currentValue;
      this.retrieveMarks();
    }
  }

  private retrieveMarks() {
    this.isLoading = true;
    this.markService.search(this.student.id, undefined, true)
        .then((marks: Mark[]) => {
          this.studentMarks = marks;
          this.isLoading = false;
        }).catch(()=> this.isLoading = false);
  }

  private retrieveLessons() {
    this.isLoading = true;
    const groupId = this.student && this.student.group ? this.student.group.id : null;
    this.lessonSerivce.search(undefined, groupId).then((lessons) => {
      this.lessons = lessons;
      this.lessons.forEach((lesson) => this.newEvaluationMarks.push(this.buildMark(lesson)));
      this.isLoading = false;
    }).catch(()=> this.isLoading = false);
  }

  onSave(event, mark: Mark) {
    // If mark exists then update else persist
    if (mark.id) {
      this.markService.update(mark.id, mark.mark, mark.observation).then((data) => data);
    } else {
      // mark -> CreateMarkRequest
      const request: CreateMarkRequest = new CreateMarkRequest(mark);
      this.markService.save(this.student.id, request).then((data) => this.retrieveMarks());
    }
  }

  onDeleteMark(event, mark: Mark) {
    event.currentTarget.disabled = true;
    this.markService.delete(mark.id).then((data) => data);
  }
}
