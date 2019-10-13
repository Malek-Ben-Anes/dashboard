import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Student } from 'app/models/Student';
import { Lesson } from 'app/models/Lesson';
import { Message } from 'app/models/message';
import { Mark } from 'app/models/Mark';
import { MarkService } from 'app/services/mark.service';
import { TranslateService } from '@ngx-translate/core';

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
  refreshStudent = new EventEmitter<Student>();

  message: Message = new Message();
  newEvaluationMarks: Mark[];

  constructor(private markService: MarkService, private translate: TranslateService) { }

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
    const marksToBePersisted: Mark[] = _.filter(this.newEvaluationMarks, (mark: Mark) => mark.id == null && mark.mark != null && mark.observation != null);
    this.markService.save(this.student.id, marksToBePersisted)
        .then((marksAdded: Mark[]) => Array.prototype.push.apply(this.student.marks, marksAdded) )
        /*.then(marksAdded => this.refreshStudent.emit(this.student))*/
        .catch(err => console.log(err));
  }

  onDeleteMark(event, mark: Mark) {
    event.currentTarget.disabled = true;
    this.markService.delete(mark.id)
                    .then(data => this.deleteMarkFromStudent(mark))
                    .then(data => this.refreshStudent.emit(this.student))
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
        this.markDataMapping(lastestMarkAssignedToSudent, newEvaluationMark);
      }
      return isDisabled;
    }
    return false;
  }

  private generateMarksForm(lessons: Lesson[]) {
    this.newEvaluationMarks = [];
    _.forEach(lessons, lesson => this.newEvaluationMarks.push(new Mark(this.student.id, lesson)));
  }

  private isNextWeek(eventDate: Date): boolean {
    return _.now() < eventDate || new Date(_.now()).getDay() < eventDate.getDay()
      || _.now() < eventDate.setDate(eventDate.getDate() + WEEK_DAYS_NUMBER);
  }

  private markDataMapping(markSource: Mark, markDestination: Mark): void {
    markDestination.id = markSource.id;
    markDestination.lesson = markSource.lesson;
    markDestination.observation = markSource.observation;
    markDestination.mark = markSource.mark;
  }

  private deleteMarkFromStudent(mark: Mark) {
    _.remove(this.student.marks, {id: mark.id});
  }

}
