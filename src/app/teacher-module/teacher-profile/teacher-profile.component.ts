import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { AuthService } from 'app/services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BASE_URL } from 'app/app.component';
import { Teacher } from 'app/models/Teacher';
import { User } from 'app/models/User';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  form: FormGroup;
  isLogged: boolean = false;
  user: Teacher;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.user =  this.tokenStorage.getLoggedUser() as Teacher;
      console.log(this.tokenStorage.getLoggedUser());
      this.initializeForm(this.user);
    }
  }

  private initializeForm(user: Teacher): void {
    this.form = this.formBuilder.group({
      firstname: [{value: user.firstname, disabled: true}],
      lastname: [{value: user.lastname, disabled: true}],
      email: [{value: user.email, disabled: true}],
      phone: [{value: user.phone, disabled: true}],
      gender: [{value: user.gender, disabled: true}],
      birthDate: [{value: new Date(user.birthDate), disabled: true}],
      address: [{value: user.address, disabled: true}],
      description: [{value: user.description, disabled: true}],
    });
  }
}
