import { Component, OnInit } from '@angular/core';
import { Lesson } from 'app/models/Lesson';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LessonService } from 'app/services/lesson.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  lessons: Lesson[] = [];

  newLesson: Lesson = new Lesson();

  lessonForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private lessonService: LessonService) { }

  ngOnInit() {
    this.initForm();
    this.getLessons();
  }

  initForm() {
    this.lessonForm = this.formBuilder.group({
      name: ['', Validators.required],
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

  updateForm(lesson: Lesson): void {
    this.lessonForm.patchValue({
      name: lesson.name,
      //description: lesson.description,
      //studentsNumber: group.Number,
    });
  }

  onSubmit() {
    this.getSubmitedData();
    console.log(this.newLesson);
    if(this.newLesson.id !== undefined ) {

    
      this.lessonService.updateLesson(this.newLesson)
                          .subscribe(lesson => { this.newLesson = lesson; console.log("subject updated")},
                    (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      console.log(err.error);
                    console.log("Client-side error occured.");
                    } else {
                      console.log(err.error);
                    console.log("Server-side error occured.");
                    }
                    });
                  }
    else 
    this.lessonService.saveLesson(this.newLesson)
                        .subscribe(lesson => { 
                          this.initForm();
                          console.log("Subject created");
                        this.newLesson =  new Lesson();
                      this.getLessons();},
                          (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                          console.log("Client-side error occured.");
                          } else {
                          console.log("Server-side error occured.");
                          }
                          });
  }

  getSubmitedData() {
    this.newLesson.name = this.lessonForm.get('name').value;
    //this.newGroup.description = this.lessonForm.get('description').value;  
  }

  // onClick(subject: Subject) {
  //   console.log(subject);
  //   this.newSubject = subject;
  //   this.updateForm(this.newSubject);
  // }

  // clickMessage = '';
 
  // public onClickMe() {
  //   this.clickMessage = 'You are my hero!';
  // }
}
