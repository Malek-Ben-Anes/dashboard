import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Student } from 'app/models/Student';
import { Lesson } from 'app/models/Lesson';
import { LessonService } from 'app/services/lesson.service';
import { Message } from 'app/models/message';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Mark } from 'app/models/Mark';
import { MarkService } from 'app/services/mark.service';

@Component({
  selector: 'app-mark-form',
  templateUrl: './mark-form.component.html',
  styleUrls: ['./mark-form.component.scss']
})
export class MarkFormComponent implements OnInit, OnChanges {

  @Input('student') student: Student;

  lessons: Lesson[];

  message: Message = new Message();

  //markForm: FormGroup;
  newMarks: Mark[] = [];

  constructor( private formBuilder: FormBuilder, private lessonService: LessonService, private markService: MarkService) { }

  ngOnInit() {
    this.getLessons();
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.student = changes.student.currentValue;
    this.getLessons();
  }

  private getLessons() {
    this.lessonService.findAll().then(lessons => { 
      this.lessons = lessons.filter(lesson => lesson.id.groupId === this.student.group.id); 
      this.newMarks = []; 
      this.lessons.forEach(lesson => { 
        this.newMarks.push(new Mark(this.student, lesson)) });
    });
  }

  public sendMessage(): void {
    console.log(this.newMarks);

    this.newMarks.filter(mark => mark.note!== undefined && mark.mark!== undefined)
                  .forEach(mark => this.markService.saveMark(this.student.id, mark)
                  .subscribe(mark => console.log(mark))) ;
  }
}
