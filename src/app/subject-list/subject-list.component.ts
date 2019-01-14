import { Component, OnInit } from '@angular/core';
import { Subject } from 'app/models/Subject';
import { HttpErrorResponse } from '@angular/common/http';
import { SubjectService } from 'app/services/subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {


  subjects: Subject[] = [];

  newSubject: Subject = new Subject();

  subjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService) { }

  ngOnInit() {
    this.initForm();
    this.getSubjects();
  }

  initForm() {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
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

  updateForm(subject: Subject): void {
    this.subjectForm.patchValue({
      name: subject.name,
      description: subject.description,
    });
  }

  onSubmit() {
    this.getSubmitedData();
    console.log(this.newSubject);
    if(this.newSubject.id !== undefined ) {

    
      this.subjectService.updateSubject(this.newSubject)
                          .subscribe(subject => { this.newSubject = subject; console.log("subject updated")},
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
                          this.newSubject = subject; 
                          console.log("Subject created");
                        this.newSubject =  new Subject();
                      this.getSubjects();},
                          (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                          console.log("Client-side error occured.");
                          } else {
                          console.log("Server-side error occured.");
                          }
                          });
  }

  getSubmitedData() {
    this.newSubject.name = this.subjectForm.get('name').value;
    this.newSubject.description = this.subjectForm.get('description').value;
   
  }
}
