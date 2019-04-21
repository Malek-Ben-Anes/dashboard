import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
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
export class SubjectFormComponent implements OnInit, OnChanges {

  subjects: Subject[] = [];

  @Input('level')
  level: Level;

  @Input('subjectToSave')
  subjectToSave: Subject;

  @Output()
  refershEvent = new EventEmitter<string>();

  isNew: boolean;

  subjectForm: FormGroup;

  levels = Object.keys(Level);

  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService) { }

  ngOnInit() {
    this.initForm();
    if (this.subjectToSave == null) {
      this.isNew = true;
      this.subjectToSave = new Subject();
    } else {
      this.isNew = false;
      this.updateForm(this.subjectToSave);
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.level != null) {
      this.level = changes.level.currentValue;
      this.onCreateNewSubject();
    }
    if (changes.subjectToSave != null) {
      this.subjectToSave = changes.subjectToSave.currentValue;
      this.isNew = false;
    }

    if (this.subjectForm != null) {
      this.updateForm(this.subjectToSave);
    }
  }

  onCreateNewSubject() {
    this.isNew = true;
    this.subjectToSave = new Subject();
  }

  onSubmit() {
    this.getSubmitedData();
    console.log(this.subjectToSave, this.subjectToSave.id != null);
    if (this.subjectToSave.id == null) {
      this.save(this.subjectToSave);
    } else {
      this.update(this.subjectToSave);
    }
    
  }

  private initForm() {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      coefficient: ['', Validators.required],
      hourlyVolume: ['', Validators.required],
      sessionNumber: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private updateForm(subject: Subject): void {
    this.subjectForm.patchValue({
      name: subject.name,
      coefficient: subject.coefficient,
      hourlyVolume: subject.hourlyVolume,
      sessionNumber: subject.sessionNumber,
      description: subject.description,
    });
  }

  private save(subject: Subject) {
    this.subjectService.save(subject)
      .subscribe(subject => {
        this.subjectToSave = subject;
        this.onCreateNewSubject();
        this.updateForm(this.subjectToSave);
        console.log("Subject created");
        this.refershEvent.emit(null);
      },
        (err) => console.log(err.error));
  }

  private update(subject: Subject) {
    this.subjectService.update(subject)
      .subscribe(subject => { this.subjectToSave = subject; console.log("subject updated"); this.refershEvent.emit(null);},
        (err) => console.log(err.error));
  }

  private getSubmitedData() {
    this.subjectToSave.name = this.extractFieldData('name');
    this.subjectToSave.coefficient = this.extractFieldData('coefficient');
    this.subjectToSave.hourlyVolume = this.extractFieldData('hourlyVolume');
    this.subjectToSave.sessionNumber = this.extractFieldData('sessionNumber');
    this.subjectToSave.description = this.extractFieldData('description');
    this.subjectToSave.level = this.level;
  }

  private extractFieldData(property: string): any {
    return this.subjectForm.get(property).value;
  }

  /*onClick(subject: Subject) {
    console.log(subject);
    this.subjectToSave = subject;
    this.updateForm(this.subjectToSave);
  }*/
}