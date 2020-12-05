import { Component, OnInit } from '@angular/core';
import { Teacher } from '@app/models/Teacher';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { AuthService } from '@app/services/auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BASE_URL } from '@app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teacher-time-table',
  templateUrl: './teacher-time-table.component.html',
  styleUrls: ['./teacher-time-table.component.scss']
})
export class TeacherTimeTableComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  form: FormGroup;
  isLogged = false;
  user: Teacher;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.user =  this.tokenStorage.getLoggedUser() as Teacher;
    }
  }
}
