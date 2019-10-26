import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Student } from "app/models/Student";
import { StudentService } from "app/services/student.service";
import { BASE_URL } from "app/app.component";
import { DialogService } from "app/commons/dialog/dialog.service";
import { DialogData } from "app/models/DialogData";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"]
})
export class UpdatePasswordComponent implements OnInit {

  @Input('student')
  student: Student;

  @Output()
  modifiedStudent = new EventEmitter<Student>();

  BASE_URL: string = BASE_URL;

  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private dialogService: DialogService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initForm();
    console.log(this.student);
    console.log(this.student.registerUrl);
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
            Validators.maxLength(40)
          ]
        ],
        passwordConfirm: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('passwordConfirm').value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const updatePassword = true;
    this.student.password = this.passwordForm.get('password').value;
    this.studentService.update(this.student, updatePassword)
      .then((student) => {
        this.student = student;
        this.modifiedStudent.emit(this.student);
        const data: DialogData = {
          dialogTitle: this.translate.instant('All.Password.Message.update.success'),
          dialogMessage: ''
        };
        this.dialogService.openDialog(data);
      })
      .catch(err => {
        const data: DialogData = {
          dialogTitle: this.translate.instant('All.Password.Message.update.failed'),
          dialogMessage: ''
        };
        this.dialogService.openDialog(data);
    });
  }
}
