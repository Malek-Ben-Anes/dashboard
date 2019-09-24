import { Component, OnInit } from '@angular/core';
import { Student } from 'app/models/Student';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { User, Gender } from 'app/models/User';
import { AuthService } from 'app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BASE_URL } from 'app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  studentForm: FormGroup;
  isLogged = false;
  user: Student;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private formBuilder: FormBuilder,
    private datePipe: DatePipe, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.user = this.tokenStorage.getLoggedUser();
      console.log(this.tokenStorage.getLoggedUser());
      this.initializeForm(this.user);
    }
  }

  private initializeForm(student: Student): void {
    this.studentForm = this.formBuilder.group({
      firstname: [{value: student.firstname, disabled: true}],
      lastname: [{value: student.lastname, disabled: true}],
      email: [{value: student.email, disabled: true}],
      phone: [{value: student.phone, disabled: true}],
      gender: [{value: this.translate.instant(student.gender), disabled: true}],
      birthDate: [{value: this.datePipe.transform(new Date(student.birthDate), 'dd / MM / yyyy') , disabled: true}],
      levelName: [{value: this.translate.instant(student.level), disabled: true}],
      groupName: [{value: student.group && student.group.name, disabled: true}],
      parentName: [{value: student.parentName, disabled: true}],
      parentPhone: [{value: student.parentPhone, disabled: true}],
      address: [{value: student.address, disabled: true}],
      description: [{value: student.description, disabled: true}],
    });
  }
}
