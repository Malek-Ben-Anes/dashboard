import {Component, OnInit} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {BASE_URL} from '@app/app.component';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import {AuthService} from '@app/services/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-mark-list',
  templateUrl: './mark-list.component.html',
  styleUrls: ['./mark-list.component.scss'],
})
export class MarkListComponent implements OnInit {
  BASE_URL: string = BASE_URL;
  student: Student;

  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private translate: TranslateService) { }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.student = this.tokenStorage.getLoggedUser();
    }
  }
}
