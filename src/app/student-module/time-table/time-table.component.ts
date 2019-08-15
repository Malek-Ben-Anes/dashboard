import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { BASE_URL } from 'app/app.component';
import { Student } from 'app/models/Student';
import { AuthService } from 'app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  student: Student;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.authService.getUser().subscribe(loggedUser => this.student = loggedUser);
    }
  }

}
