import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from '@app/models/Teacher.model';
import { BASE_URL } from '@app/app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '@app/services/teacher.service';
import { DialogService } from '@app/commons/dialog/dialog.service';
import { DialogData } from '@app/models/DialogData';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private formBuilder: FormBuilder, private teacherService: TeacherService, private dialogService: DialogService,
              private translate: TranslateService) { }

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
    ;
    this.teacherService
      .updatePassword(this.teacher.id, this.passwordForm.get("password").value)
      .subscribe(
        (teacher: Teacher) => {
        this.teacher = teacher;
        this.modifiedTeacher.emit(this.teacher);
        const data: DialogData = {
          dialogTitle: this.translate.instant('All.Password.Message.update.success'),
          dialogMessage: ''
        };
        this.dialogService.openDialog(data);
      }, err => {
          const data: DialogData = {
            dialogTitle: this.translate.instant('All.Password.Message.update.failed'),
            dialogMessage: ''
          };
          this.dialogService.openDialog(data);
        }
      );
  }
}
