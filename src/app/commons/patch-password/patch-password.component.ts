import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {saveAs} from 'file-saver';

import {BASE_URL} from 'app/app.component';
import {UpdatePasswordRequest} from '@app/models/requests/student/UpdatePasswordRequest.model';
import {User} from '@app/models/User';
import {MessageFactory} from '@app/services/message.factory';
import {AuthService} from '@app/services/auth/auth.service';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-patch-password',
  templateUrl: './patch-password.component.html',
  styleUrls: ['./patch-password.component.scss'],
})
export class PatchPasswordComponent implements OnInit {
  BASE_URL: string = BASE_URL;
  passwordForm: FormGroup;
  hide = true;
  confirmHide = true;
  registrationFile: File;
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageFactory: MessageFactory,
    private authService: AuthService,
  ) {
    this.passwordForm = this.initPasswordForm();
  }

  async ngOnInit() {
    await this.authService.getLoggedUser()
        .then((user) => this.currentUser = user);
  }

  get f() {
    return this.passwordForm.controls;
  }

  initPasswordForm(): FormGroup {
    return this.formBuilder.group(
        {
          oldPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(50),
            ],
          ],
          newPassword: [
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
    if (form) {
      return form.get('newPassword').value === form.get('passwordConfirm').value ?
      null :
      {mismatch: true};
    }
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const updatePassword: UpdatePasswordRequest = {
      oldPassword: this.passwordForm.get('oldPassword').value,
      newPassword: this.passwordForm.get('newPassword').value,
    };
    this.userService.updatePassword(this.currentUser.id, updatePassword)
        .then((response) => {
          const blob = new Blob([response], {type: 'application/pdf'});
          const registrationFileName = `${this.currentUser.firstName}-${this.currentUser.lastName}-registration.pdf`;
          saveAs(blob, registrationFileName);
          this.messageFactory.createMessage('All.Password.Message.update.success');
        }).catch((err) => {
          this.messageFactory.createMessage('All.Password.Message.update.failed');
        });
  }
}
