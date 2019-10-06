import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { BASE_URL } from 'app/app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from 'app/services/teacher.service';
import { DialogService } from 'app/commons/dialog/dialog.service';
import { DialogData } from 'app/models/DialogData';

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

  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService, private dialogService: DialogService) { }

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

  private passwordMatchValidator(f: FormGroup) {
    return f.get('password').value === f.get('passwordConfirm').value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.teacher.password = this.passwordForm.get("password").value;
    const updatePassword = true;
    this.teacherService
      .update(this.teacher, updatePassword)
      .then(
        (teacher: Teacher) => {
        this.teacher = teacher;
        this.modifiedTeacher.emit(this.teacher);
        const data: DialogData = {
          dialogTitle: 'User password has been successfully updated!',
          dialogMessage: ''
        };
        this.dialogService.openDialog(data);
      })
      .catch(
        err => {
          const data: DialogData = {
            dialogTitle: 'User password update has failed :(',
            dialogMessage: ''
          };
          this.dialogService.openDialog(data);
        }
      );
  }
}
