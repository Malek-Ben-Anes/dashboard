import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Student } from 'app/models/Student';
import { Lesson } from 'app/models/Lesson';
import { LessonService } from 'app/services/lesson.service';
import { Message } from 'app/models/message';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Mark } from 'app/models/Mark';
import { MarkService } from 'app/services/mark.service';

const WEEK_DAYS_NUMBER = 7;

@Component({
  selector: 'app-group-marks-form',
  templateUrl: './group-marks-form.component.html',
  styleUrls: ['./group-marks-form.component.scss']
})
export class GroupMarksFormComponent implements OnInit, OnChanges {

  @Input('student') student: Student;

  @Input('lessons') lessons: Lesson[];

  @Output()
  refreshEvent = new EventEmitter<Student>();

  message: Message = new Message();
  newEvaluationMarks: Mark[];

  constructor(private markService: MarkService) { }

  ngOnInit() {
    this.generateMarksForm(this.lessons);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student) {
      this.student = changes.student.currentValue;
    }
    if (changes.lessons) {
      this.lessons = changes.lessons.currentValue;
    }
    this.generateMarksForm(this.lessons);
  }

  public onSendEvaluation(): void {
    const evalutionMarksToBePersisted: Mark[] = _.filter(this.newEvaluationMarks, mark => mark.note != null && mark.mark != null);
    _.forEach(evalutionMarksToBePersisted, (markRequest: Mark) => this.markService.save(this.student.id, markRequest)
        .then((mark: Mark) => this.student.marks.push(mark))
        .then(data => this.refreshEvent.emit(this.student))
        .catch(err => console.log(err)));
  }

  onDeleteMark(event, mark: Mark) {
    event.currentTarget.disabled = true;
    this.markService.delete(this.student.id, mark.id)
                    .then(data => mark = new Mark(this.student, mark.lesson))
                    .then(data => this.generateMarksForm(this.lessons))
                    .catch(err => console.log(err));
  }

  /**
   * Mark can be assigned to student (mark field is Enabled) every week.
   */
  isDisabled(newEvaluationMark: Mark): boolean {
    const lastestMarkAssignedToSudent: Mark = _.chain(this.student.marks).filter(mark => _.isEqual(mark.lesson, newEvaluationMark.lesson))
      .sortBy(['updatedAt']).last().value();
    if (lastestMarkAssignedToSudent != null) {
      const lastestMarkDate = new Date(lastestMarkAssignedToSudent.updatedAt);
      const isDisabled: boolean = this.isNextWeek(lastestMarkDate);
      if (isDisabled) {
        newEvaluationMark.id = lastestMarkAssignedToSudent.id;
        newEvaluationMark.note = lastestMarkAssignedToSudent.note;
        newEvaluationMark.mark = lastestMarkAssignedToSudent.mark;
      }
      return isDisabled;
    }
    return false;
  }

  private generateMarksForm(lessons: Lesson[]) {
    this.newEvaluationMarks = [];
    _.forEach(lessons, lesson => this.newEvaluationMarks.push(new Mark(this.student, lesson)));
  }

  private isNextWeek(eventDate: Date): boolean {
    return _.now() < eventDate || new Date(_.now()).getDay() < eventDate.getDay()
      || _.now() < eventDate.setDate(eventDate.getDate() + WEEK_DAYS_NUMBER);
  }

}
