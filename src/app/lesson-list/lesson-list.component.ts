import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';


import { Lesson, LessonId } from 'app/models/Lesson';
import { LessonService } from 'app/services/lesson.service';
import { Level } from 'app/models/Level';
import { Teacher } from 'app/models/Teacher';
import { Group } from 'app/models/Group';
import { Subject } from 'app/models/Subject';
import { GroupService } from 'app/services/group.service';
import { TeacherService } from 'app/services/teacher.service';
import { SubjectService } from 'app/services/subject.service';
import { LessonTimeTableComponent } from './lesson-time-table/lesson-time-table.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  lessons: Lesson[] = [];
  newLesson: Lesson = new Lesson();

  // lessons  data
  levels = Object.keys(Level);
  subjects: Subject[];
  teachers: Teacher[];
  groups: Group[];

  lessonForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private lessonService: LessonService,
    private groupService: GroupService, private teacherService: TeacherService, private subjectService: SubjectService) { }


  openDialog() {
    this.dialog.open(LessonTimeTableComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  ngOnInit() {
    this.initForm();
    this.initData();
  }

  initForm() {
    this.lessonForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: [null, Validators.required],
      subject: [null, Validators.required],
      teacher: [null, Validators.required],
      group: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  getLessons(): void {
    this.lessonService.getLessons()
      .subscribe(lessons => { this.lessons = lessons; console.log(this.lessons); },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        }
      );
  }

  private initData() {
    this.getLessons();
    this.subjectService.findAll().subscribe(subjects => this.subjects = subjects,
      err => this.errorHandler(err));
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers,
      err => this.errorHandler(err));
    this.groupService.findAll().subscribe(groups => this.groups = groups,
      err => this.errorHandler(err));
  }



  onSubmit() {
    this.extractFormData();
    console.log(this.newLesson);
    this.createLesson(this.newLesson);
    // if (this.newLesson.id !== undefined) {
    //   this.updateLesson(this.newLesson);
    // }
    // else {
    // }
  }
  private updateLesson(lessonRequest: Lesson): void {
    console.log(lessonRequest);
    this.lessonService.updateLesson(lessonRequest)
      .subscribe(lesson => { this.newLesson = lesson; console.log("lesson updated"); this.getLessons(); },
        err => this.errorHandler(err));
  }

  private createLesson(lessonRequest: Lesson): void {
    console.log(lessonRequest);
    this.lessonService.saveLesson(lessonRequest)
      .subscribe(lesson => { this.newLesson = lesson; console.log("lesson created"); this.getLessons(); },
        err => this.errorHandler(err));
  }

  private extractFormData(): void {
    this.newLesson.name = this.extractFieldData('name');
    this.newLesson.level = this.extractFieldData('level');
    this.newLesson.description = this.extractFieldData('description');
    this.newLesson.id = new LessonId();

    // Complement Data
    const teacher = this.extractFieldData('teacher');
    this.newLesson.id.teacherId = teacher.id;
    this.newLesson.teacherName = teacher.name;

    const subject = this.extractFieldData('subject');
    this.newLesson.id.subjectId = subject.id;
    this.newLesson.subjectName = subject.name;

    const group = this.extractFieldData('group');
    this.newLesson.id.groupId = group.id;
    this.newLesson.groupName = group.name;
  }

  private extractFieldData(property: string): any {
    return this.lessonForm.get(property).value;
  }

  updateForm(lesson: Lesson): void {
    this.lessonForm.patchValue({
      name: lesson.name,
    });
  }

  private errorHandler(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log(err.error);
      console.log("Client-side error occured.");
    } else {
      console.log(err.error);
      console.log("Server-side error occured.");
    }
  }
}