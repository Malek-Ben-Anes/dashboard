import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { Gender } from 'app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from 'app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from 'app/models/Level';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  @Input('teacher') teacher: Teacher;

  @Input('isNew') isNew: boolean;

  @Output() modifiedTeacher = new EventEmitter<Teacher>();

  genders = Object.keys(Gender);
  levels = Object.keys(Level);

  teacherForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private teachersService: TeacherService,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
    console.log("teacher profile: ", this.teacher);
    if ( this.teacher === undefined ) {
      this.teacher = new Teacher();
    }
    this.updateForm(this.teacher);
  }

  initForm() {
    this.teacherForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      birthDate: [new Date, Validators.required],
      phone: ['', Validators.required],
      gender: [Gender, Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  updateForm(teacher: Teacher): void {
    this.teacherForm.patchValue({
      username: teacher.username,
      firstname: teacher.firstname,
      lastname: teacher.lastname,
      phone: teacher.phone,
      email: teacher.email,
      birthDate: teacher.birthDate,
      gender: <Gender> teacher.gender,
      address: teacher.address,
      description: teacher.description,
    });
    this.teacherForm.get('birthDate').setValue(new Date(this.teacher.birthDate));
    if (!this.isNew) {
      this.teacherForm.controls['email'].disable();
    }
  }

  onSubmit() {
    this.extractFormData();
    this.modifiedTeacher.emit(this.teacher);
  }

  extractFormData() {
    this.teacher.firstname = this.extractFieldData('firstname');
    this.teacher.lastname = this.extractFieldData('lastname');
    this.teacher.name = this.teacher.firstname + ' ' + this.teacher.lastname;
    this.teacher.email = this.extractFieldData('email');
    this.teacher.username = this.teacher.email;
    this.teacher.phone = this.extractFieldData('phone');
    this.teacher.birthDate = new Date(this.extractFieldData('birthDate'));
    this.teacher.gender = this.extractFieldData('gender');
    this.teacher.address = this.extractFieldData('address');
    this.teacher.description = this.extractFieldData('description');
  }

  private extractFieldData(property: string): any {
    return this.teacherForm.get(property).value;
  }
}
