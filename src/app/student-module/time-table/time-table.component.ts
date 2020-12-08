import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { BASE_URL } from '@app/app.component';
import { Student } from '@app/models/Student.model';
import { AuthService } from '@app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  student: Student;
  timeTableUrl: string;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
        this.student = this.tokenStorage.getLoggedUser();
        this.timeTableUrl = this.retrieveTimeTableUrl();
    }
  }

  private retrieveTimeTableUrl(): string {
    return this.student && this.student.group && this.student.group.timeTableUrl;
  }
}
