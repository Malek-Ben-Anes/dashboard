import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Student } from "@app/models/Student.model";
import { StudentService } from "app/services/student.service";
import { BASE_URL } from "app/app.component";
import { DialogService } from "app/commons/dialog/dialog.service";
import { DialogData } from "app/models/DialogData";
import { TranslateService } from "@ngx-translate/core";
import { UpdatePasswordRequest } from "@app/models/requests/student/UpdatePasswordRequest.model";

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
  passwordForm: FormGroup = this.initPasswordForm();
  hide = true;
  confirmHide = true;
  registrationFile: File;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private dialogService: DialogService,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  get f() {
    return this.passwordForm.controls;
  }

  initPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
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

    const updatePassword: UpdatePasswordRequest = {password: this.passwordForm.get('password').value};
    this.studentService.updatePassword(this.student.id, updatePassword)
      .subscribe((registrationFile) => {
        this.registrationFile = registrationFile;
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
      });
  }

  public onGeneratePassword() {
    const randomPassword = this.randomPassword();
    this.passwordForm.setValue({
      password: randomPassword,
      passwordConfirm: randomPassword
    });
  }

  private randomPassword(): string {
    let result = '';
    const characters = '0123456789';
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
