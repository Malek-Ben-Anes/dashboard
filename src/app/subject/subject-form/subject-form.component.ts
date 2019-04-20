import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectService } from 'app/services/subject.service';
import { Subject } from 'app/models/Subject';
import { Level } from 'app/models/Level';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {

  subjects: Subject[] = [];

  newSubject: Subject = new Subject();

  subjectForm: FormGroup;

  levels = Object.keys(Level);

  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService) { }

  ngOnInit() {
    this.initForm();
    this.getSubjects();
  }

  initForm() {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      coefficient: ['', Validators.required],
      hourlyVolume: ['', Validators.required],
      sessionNumber: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  updateForm(subject: Subject): void {
    this.subjectForm.patchValue({
      name: subject.name,
      description: subject.description,
    });
  }

  getSubjects(): void {
    this.subjectService.getSubjects()
      .subscribe(subjects => this.subjects = subjects,
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        }
      );
  }

  onSubmit() {
    this.getSubmitedData();
    console.log(this.newSubject);
    if (this.newSubject.id !== undefined) {


      this.subjectService.updateSubject(this.newSubject)
        .subscribe(subject => { this.newSubject = subject; console.log("subject updated") },
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
      this.subjectService.saveSubject(this.newSubject)
        .subscribe(subject => {
          this.initForm();
          console.log("Subject created");
          this.newSubject = new Subject();
          this.getSubjects();
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });
  }


  getSubmitedData() {
    this.newSubject.name = this.extractFieldData('name');
    this.newSubject.level = this.extractFieldData('level');
    this.newSubject.coefficient = this.extractFieldData('coefficient');
    this.newSubject.hourlyVolume = this.extractFieldData('hourlyVolume');
    this.newSubject.sessionNumber = this.extractFieldData('sessionNumber');
    this.newSubject.description = this.extractFieldData('description');
  }

  private extractFieldData(property: string): any {
    return this.subjectForm.get(property).value;
  }

  onClick(subject: Subject) {
    console.log(subject);
    this.newSubject = subject;
    this.updateForm(this.newSubject);
  }

}
