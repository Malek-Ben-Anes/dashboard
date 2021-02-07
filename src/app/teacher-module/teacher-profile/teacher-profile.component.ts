import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import {AuthService} from '@app/services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BASE_URL} from '@app/app.component';
import {Teacher} from '@app/models/Teacher.model';
import {UpdateTeacherRequest} from '@app/models/requests/teacher/UpdateTeacher.model';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {TeacherService} from '@app/services/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
  BASE_URL: string = BASE_URL;

  form: FormGroup;
  isLogged = false;
  user: Teacher;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private formBuilder: FormBuilder,
              private teacherService: TeacherService, private datePipe: DatePipe, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.user = this.tokenStorage.getLoggedUser() as Teacher;
      this.updateForm(this.user);
    }
  }

  onUpdate() {
    console.log('update');
    this.teacherService.patch(this.user.id, this.prepareRequest()).subscribe((teacher) => {
      this.user = teacher;
      console.log(teacher);
      this.updateForm(teacher);
      this.authService.saveLoggedUser(teacher);
    });
  }

  private updateForm(user: Teacher): void {
    this.form = this.formBuilder.group({
      firstName: [{value: user.firstName, disabled: true}],
      lastName: [{value: user.lastName, disabled: true}],
      email: [{value: user.email, disabled: true}],
      gender: [{value: user.gender, disabled: true}],
      phone: [user.phone, Validators.required],
      birthDate: [new Date(user.birthDate), Validators.required],
      address: [user.address, Validators.required],
      description: [user.description, [Validators.required, Validators.minLength(6), Validators.maxLength(500)]],
    });
    this.form.get('birthDate').setValue(new Date(this.user.birthDate));
  }

  private prepareRequest(): UpdateTeacherRequest {
    const request = new UpdateTeacherRequest();
    request.phone = this.form.get('phone').value;
    request.birthDate = this.form.get('birthDate').value;
    request.gender = this.form.get('gender').value;
    request.address = this.form.get('address').value;
    request.description = this.form.get('description').value;
    return request;
  }
}
