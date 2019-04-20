import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { BASE_URL } from 'app/app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from 'app/services/teacher.service';

@Component({
  selector: 'app-update-teacher-password',
  templateUrl: './update-teacher-password.component.html',
  styleUrls: ['./update-teacher-password.component.scss']
})
export class UpdateTeacherPasswordComponent implements OnInit {

  @Input('teacher') teacher: Teacher;

  @Output() modifiedTeacher = new EventEmitter<Teacher>();

  BASE_URL: string = BASE_URL;

  passwordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService) { }

  ngOnInit() {
    this.initForm();
  }

  get f() {
    return this.passwordForm.controls;
  }

  initForm() {
    this.passwordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]
        ],
        passwordConfirm: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]
        ]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("passwordConfirm").value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.teacher.password = this.passwordForm.get("password").value;
    this.teacherService
      .updatePassword(this.teacher)
      .subscribe(
        (teacher: Teacher) => {
        alert("password updated successfully!");
        this.teacher = teacher;
        this.modifiedTeacher.emit(this.teacher);},
        err => console.log("password update failed!")
      );
  }
}
