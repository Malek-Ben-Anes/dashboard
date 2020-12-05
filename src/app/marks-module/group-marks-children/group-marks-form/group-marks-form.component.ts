import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Student } from '@app/models/Student';
import { Lesson } from '@app/models/Lesson';
import { Message } from '@app/models/message';
import { Mark } from '@app/models/Mark';
import { MarkService } from '@app/services/mark.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-marks-form',
  templateUrl: './group-marks-form.component.html',
  styleUrls: ['./group-marks-form.component.scss']
})
export class GroupMarksFormComponent implements OnInit, OnChanges {

  @Input('student') student: Student;

  @Input('lessons') lessons: Lesson[];

  @Output()
  refresh = new EventEmitter<Student>();

  message: Message = new Message();
  newEvaluationMarks: Mark[];

  constructor(private markService: MarkService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.generateMarksForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student) {
      this.student = changes.student.currentValue;
    }
    if (changes.lessons) {
      this.lessons = changes.lessons.currentValue;
    }
    this.generateMarksForm();
  }

  public onSendEvaluation(): void {
    const marksToBePersisted: Mark[] = _.filter(this.newEvaluationMarks, (mark: Mark) => this.isToPersist(mark));
    this.markService.save(this.student.id, marksToBePersisted)
        .then((marksAdded: Mark[]) =>
         {
           this.refresh.emit(this.student);
           //this.student.marks = this.student.marks.concat(marksToBePersisted);;
           //this.generateMarksForm();
         })
        .catch(err => console.log(err));
  }

  private isToPersist(mark: Mark): boolean {
    return _.isNil(mark.id) &&  !_.isNil(mark.mark) && !_.isNil(mark.observation);
  }

  onDeleteMark(event, mark: Mark) {
    event.currentTarget.disabled = true;
    this.markService.delete(mark.id)
      .then(data =>
       {
         this.deleteMarkFromStudent(mark);
         this.refresh.emit(this.student);
         this.generateMarksForm();
       })
      .catch(err => console.log(err));
  }

  private generateMarksForm() {
    this.newEvaluationMarks = [];
    const updatableMarks: Mark[] = _.filter(this.student.marks, (mark: Mark) => mark.updatable);
    _.forEach(this.lessons, lesson => this.newEvaluationMarks.push(this.addNewMark(updatableMarks, lesson)));
  }

  private addNewMark(updatableMarks: Mark[], lesson: Lesson) {
    const updatableMark: Mark = _.find(updatableMarks, mark => _.isEqual(mark.lesson, lesson));
    return updatableMark ? updatableMark : new Mark(this.student.id, lesson);
  }

  private deleteMarkFromStudent(mark: Mark) {
    _.remove(this.student.marks, {id: mark.id});
  }
}
