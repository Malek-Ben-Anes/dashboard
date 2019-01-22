import { Component, OnInit } from '@angular/core';
import { Lesson } from 'app/models/Lesson';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessonService } from 'app/services/lesson.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Level } from 'app/models/Level';
import { Teacher } from 'app/models/Teacher';
import { Group } from 'app/models/Group';
import { Subject } from 'app/models/Subject';
import { GroupService } from 'app/services/group.service';
import { TeacherService } from 'app/services/teacher.service';
import { SubjectService } from 'app/services/subject.service';

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

  constructor(private formBuilder: FormBuilder, private lessonService: LessonService,
    private groupService: GroupService, private teacherService: TeacherService, private subjectService: SubjectService) { }

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
    this.subjectService.getSubjects().subscribe(subjects => this.subjects = subjects,
      err => this.errorHandler(err));
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers,
      err => this.errorHandler(err));
    this.groupService.getGroups().subscribe(groups => this.groups = groups,
      err => this.errorHandler(err));
  }



  onSubmit() {
    this.extractFormData();
    console.log(this.newLesson);
    if (this.newLesson.id !== undefined) {
      this.updateLesson(this.newLesson);
    }
    else {
      this.createLesson(this.newLesson);
    }
  }
  private updateLesson(lessonRequest: Lesson): void {
    this.lessonService.updateLesson(lessonRequest)
      .subscribe(lesson => { this.newLesson = lesson; console.log("lesson updated"); this.getLessons(); },
        err => this.errorHandler(err));
  }

  private createLesson(lessonRequest: Lesson): void {
    this.lessonService.saveLesson(lessonRequest)
      .subscribe(lesson => { this.newLesson = lesson; console.log("lesson created"); this.getLessons(); },
        err => this.errorHandler(err));
  }

  private extractFormData(): void {
    this.newLesson.name = this.extractFieldData('name');
    this.newLesson.level = this.extractFieldData('level');
    this.newLesson.id = {};
    this.newLesson.id.subjectId = this.extractFieldData('subject').id;
    this.newLesson.id.teacherId = this.extractFieldData('teacher').id;
    this.newLesson.id.groupId = this.extractFieldData('group').id;
    this.newLesson.description = this.extractFieldData('description');
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
