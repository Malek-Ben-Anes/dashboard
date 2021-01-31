import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { saveAs } from "file-saver";

import { BASE_URL } from "app/app.component";
import { DialogService } from "app/commons/dialog/dialog.service";
import { DialogData } from "app/models/DialogData";
import { TranslateService } from "@ngx-translate/core";
import { UpdatePasswordRequest } from "@app/models/requests/student/UpdatePasswordRequest.model";
import { User } from "@app/models/User";
import { UserService } from "@app/services/user.service";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"],
})
export class UpdatePasswordComponent implements OnInit {
  @Input("user")
  user: User;

  BASE_URL: string = BASE_URL;
  passwordForm: FormGroup;
  hide = true;
  confirmHide = true;
  registrationFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.passwordForm = this.initPasswordForm();
  }

  get f() {
    return this.passwordForm.controls;
  }

  initPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        passwordConfirm: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    return form.get("password").value === form.get("passwordConfirm").value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const updatePassword: UpdatePasswordRequest = {
      password: this.passwordForm.get("password").value,
    };
    this.userService.updatePassword(this.user.id, updatePassword).subscribe(
      (response) => {
        const blob = new Blob([response], { type: "application/pdf" });
        const registrationFileName = `${this.user.firstName}-${this.user.lastName}-registration.pdf`;
        saveAs(blob, registrationFileName);
        const data: DialogData = {
          dialogTitle: this.translate.instant(
            "All.Password.Message.update.success"
          ),
          dialogMessage: "",
        };
        this.dialogService.openDialog(data);
      },
      (err) => {
        const data: DialogData = {
          dialogTitle: this.translate.instant(
            "All.Password.Message.update.failed"
          ),
          dialogMessage: "",
        };
        this.dialogService.openDialog(data);
      }
    );
  }

  public onGeneratePassword() {
    const randomPassword = this.randomPassword();
    this.passwordForm.setValue({
      password: randomPassword,
      passwordConfirm: randomPassword,
    });
  }

  private randomPassword(): string {
    let result = "";
    const characters = "0123456789";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
