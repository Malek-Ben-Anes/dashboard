import * as _ from 'lodash';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { Gender } from 'app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from 'app/models/Student';
import { Level } from 'app/models/Level';
import { Group } from 'app/models/Group';
import { GroupService } from 'app/services/group.service';
import { TranslateService } from '@ngx-translate/core';


const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  @Input('student')
  student: Student;

  @Input('isNew')
  isNew: boolean;

  @Output()
  modifiedStudent = new EventEmitter<Student>();

  genders = Object.keys(Gender);
  levels = Object.keys(Level);

  studentForm: FormGroup;
  groups: Group[] = [];

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
    this.initForm();
    this.getGroup();
  }

  onSubmit() {
    this.extractFormData();
    this.modifiedStudent.emit(this.student);
  }

  private getGroup() {
    this.groupService.findAll().then(groups => {this.groups = groups;
      this.updateForm(this.student);
    }).then(err => console.log(err));
  }

  private initForm() {

    this.studentForm = this.formBuilder.group({
      firstname: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      lastname: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      birthDate: [null, Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      level: [null, Validators.required],
      group: [null, Validators.required],
      parentName: ['', Validators.required],
      parentPhone: ['', Validators.required],
      address: ['', Validators.required],
      description: [''],
    });
  }

  private updateForm(student: Student): void {
    this.studentForm.patchValue({
      firstname: student.firstname,
      lastname: student.lastname,
      phone: student.phone,
      email: student.email,
      gender: <Gender> student.gender,
      address: student.address,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      description: student.description,
    });

    if (!this.isNew) {
      this.studentForm.controls['email'].disable();
    }
    this.studentForm.get('birthDate').setValue(new Date(this.student.birthDate));
    const toSelect2 = this.levels.find(level => level === this.student.level);
    this.studentForm.get('level').setValue(toSelect2);
    if (this.student.group != null) {
      const toSelect1 = _.find(this.groups, (group) => group.id === this.student.group.id);
      this.studentForm.get('group').setValue(toSelect1);
    }
  }

  private extractFormData(): void {
    this.student.firstname = this.extractFieldData('firstname');
    this.student.lastname = this.extractFieldData('lastname');
    this.student.name = this.student.firstname + ' ' + this.student.lastname;
    this.student.email = this.extractFieldData('email');
    this.student.username = this.student.email;
    this.student.phone = this.extractFieldData('phone');
    this.student.birthDate = new Date(this.extractFieldData('birthDate'));
    this.student.gender = this.extractFieldData('gender');
    this.student.group = this.extractFieldData('group');
    this.student.level = this.extractFieldData('level');
    this.student.address = this.extractFieldData('address');
    this.student.parentName = this.extractFieldData('parentName');
    this.student.parentPhone = this.extractFieldData('parentPhone');
    this.student.description = this.extractFieldData('description');
  }

  private extractFieldData(property: string): any {
    return this.studentForm.get(property).value;
  }
}
