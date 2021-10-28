import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {saveAs} from 'file-saver';

import {BASE_URL} from 'app/app.component';
import {DialogService} from 'app/commons/dialog/dialog.service';
import {DialogData} from 'app/models/DialogData';
import {TranslateService} from '@ngx-translate/core';
import {User} from '@app/models/User';
import {CreatePasswordRequest} from '@app/models/password/CreatePasswordRequest.model';
import {UserService} from '@app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  @Input('user')
  user: User;

  BASE_URL: string = BASE_URL;
  passwordForm: FormGroup;
  hide = true;
  confirmHide = true;
  registrationFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private translate: TranslateService,
    private toast: ToastrService,
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
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(50),
            ],
          ],
          passwordConfirm: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(50),
            ],
          ],
        },
        {validator: this.passwordMatchValidator},
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('passwordConfirm').value ?
      null :
      {mismatch: true};
  }

  async onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }
    const updatePassword: CreatePasswordRequest = {password: this.passwordForm.get('password').value};

    try {
      const response = await this.userService.createPassword(this.user.id, updatePassword);
      const blob = new Blob([response], {type: 'application/pdf'});
      const registrationFileName = `${this.user.firstName}-${this.user.lastName}-registration.pdf`;
      saveAs(blob, registrationFileName);
      this.toast.success(await this.translate.instant('All.Password.Message.update.success'), 'OK!');
    } catch {
      this.toast.error(await this.translate.instant('All.text.create.failed.duplicated'), 'KO!');
    }
  }

  public onGeneratePassword() {
    let randomPassword = '';
    const characters = '0123456789';
    for (let i = 0; i < 8; i++) {
      randomPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.passwordForm.patchValue({password: randomPassword, passwordConfirm: randomPassword});
  }
}
