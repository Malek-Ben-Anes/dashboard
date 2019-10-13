import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Student } from 'app/models/Student';
import { Lesson } from 'app/models/Lesson';
import { Message } from 'app/models/message';
import { Mark } from 'app/models/Mark';
import { MarkService } from 'app/services/mark.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-marks-form',
  templateUrl: './group-marks-form.component.html',
  styleUrls: ['./group-marks-form.component.scss']
})
export class GroupMarksFormComponent implements OnInit, OnChanges {

  @Input('student') student: Student;

  @Input('lessons') lessons: Lesson[];

  @Input('selectedMarks')
  selectedMarks: Mark[];  

  @Output()
  refreshStudent = new EventEmitter<Student>();

  message: Message = new Message();
  newEvaluationMarks: Mark[];

  constructor(private markService: MarkService, private translate: TranslateService) { }

  ngOnInit() {
    this.generateMarksForm(this.lessons);
    if (this.student.marks) {
      this.student.marks = [];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.student) {
      this.student = changes.student.currentValue;
      if (this.student.marks) {
        this.student.marks = [];
      }
    }
    if (changes.lessons) {
      this.lessons = changes.lessons.currentValue;
    }
    this.generateMarksForm(this.lessons);
  }

  public onSendEvaluation(): void {
    const marksToBePersisted: Mark[] = _.filter(this.newEvaluationMarks, (mark: Mark) => mark.id == null && mark.mark != null && mark.observation != null);
    this.markService.save(this.student.id, marksToBePersisted)
        .then((marksAdded: Mark[]) => {this.refreshStudent.emit(this.student);})
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

  private generateMarksForm(lessons: Lesson[]) {
    this.newEvaluationMarks = [];
    const updatableMarks: Mark[] = _.filter(this.selectedMarks, (mark: Mark) => mark.updatable);
    _.forEach(lessons, lesson => this.newEvaluationMarks.push(this.addNewMark(updatableMarks, lesson)));
  }

  private addNewMark(updatableMarks: Mark[], lesson: Lesson) {
    const updatableMark: Mark = _.find(updatableMarks, mark => _.isEqual(mark.lesson, lesson));
    return updatableMark ? updatableMark : new Mark(this.student.id, lesson);
  }

  private deleteMarkFromStudent(mark: Mark) {
    _.remove(this.student.marks, {id: mark.id});
  }

}
