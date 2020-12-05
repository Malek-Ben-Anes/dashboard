import * as _ from 'lodash';
import { Component, OnInit, Input } from '@angular/core';
import { Student } from '@app/models/Student';
import { BASE_URL } from '@app/app.component';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { AuthService } from '@app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Bulletin } from '@app/models/Bulletin';

@Component({
  selector: 'app-bulletin-list',
  templateUrl: './bulletin-list.component.html',
  styleUrls: ['./bulletin-list.component.scss']
})
export class BulletinListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  student: Student;

  constructor(private translate: TranslateService, private tokenStorage: TokenStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.student = this.tokenStorage.getLoggedUser();
    }
  }

  displayBulletins(): boolean {
    return this.student &&  !_.isEmpty(this.student.bulletins);
  }

  public getTrimester(bulletin: Bulletin): string {
    return bulletin.trimester ? 'All.text.Trimesters.' + bulletin.trimester : '';
  }
}
