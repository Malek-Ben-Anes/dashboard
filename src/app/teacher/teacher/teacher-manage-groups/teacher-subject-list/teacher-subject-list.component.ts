import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { SubjectService } from 'app/services/subject.service';
import { Group } from 'app/models/Group';
import { Subject } from 'app/models/Subject';
import { Level } from 'app/models/Level';
import { LessonService } from 'app/services/lesson.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-teacher-subject-list',
  templateUrl: './teacher-subject-list.component.html',
  styleUrls: ['./teacher-subject-list.component.scss']
})
export class TeacherSubjectListComponent implements OnInit, OnChanges {
  // URL dynamic fields form : https://alligator.io/angular/reactive-forms-formarray-dynamic-fields/
  // http://marcusresell.com/2018/07/18/dynamic-checkbox-angular/

  @Input('selectedGroup') selectedGroup: Group;

  subjects: Subject[];

  subjectsPerLevel: Subject[];

  subjectsForm: FormGroup;
  subjectsPreferences = [];

  constructor(private fb: FormBuilder, private subjectService: SubjectService, private lessonService: LessonService) { }

  ngOnInit() {
    this.subjectService.findAll().subscribe(subjects => this.subjects = subjects, err => console.log(err));
    this.subjectService.findAllSubjectByLevel(this.selectedGroup.level, this.subjects)
      .then(subjects => this.subjectsPerLevel = subjects)
      .then(subjects => this.updateForm())
      .then(subjects => this.updateLastChoicesForm())
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedGroup = changes.selectedGroup.currentValue;
    this.subjectService.findAllSubjectByLevel(this.selectedGroup.level, this.subjects)
      .then(subjects => this.subjectsPerLevel = subjects)
      .then(subjects => this.updateForm())
  }

  submit() {
    const selectedPreferences = this.subjectsForm.value.subjectsPreferences
      .map((checked, index) => checked ? this.subjectsPreferences[index].id : null)
      .filter(value => value !== null);
    // Do something with the result
    console.log(selectedPreferences);
  }

  private initForm() {
    const formControls = this.subjectsPreferences.map(control => new FormControl(false));
    this.subjectsForm = this.fb.group({
      subjectsPreferences: new FormArray(formControls)
    });
  }

  private updateForm() {
    this.subjectsPreferences = this.updateSubjects(this.subjectsPerLevel);
    const formControls = this.subjectsPreferences.map(control => new FormControl(false));
    this.subjectsForm = this.fb.group({
      subjectsPreferences: new FormArray(formControls)
    });
  }

  private updateLastChoicesForm() {

  }

  private updateSubjects(subjects: Subject[]) {
    console.log( _.map(subjects, subject =>  this.checkBoxObject(subject.id, subject.name)));
    return _.map(subjects, subject =>  this.checkBoxObject(subject.id, subject.name));
  }

  private checkBoxObject(id: string, name: string) {
    return { id: id, genre: name };
  }
}


/*
this.cityArray = new FormArray([new FormControl(false), new FormControl(true)]);
this.myGroup = new FormGroup({
  cities: this.cityArray
});
    this.subjectsForm = this.formBuilder.group({
 items: this.formBuilder.array([ this.createItem() ])
});
addItem(): void {
 this.items = this.subjectsForm.get('items') as FormArray;
 this.items.push(this.createItem());
}

createItem(): FormGroup {
 return this.formBuilder.group({checked: false});
}*/

