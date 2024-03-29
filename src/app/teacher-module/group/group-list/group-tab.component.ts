import { Component, OnInit } from '@angular/core';
import { Group } from '@app/models/Group.model';
import { Level } from '@app/models/enums/Level';
import { GroupService } from '@app/services/group.service';
import { BASE_URL } from '@app/app.component';
import { FormGroup } from '@angular/forms';
import { Teacher } from '@app/models/Teacher.model';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { AuthService } from '@app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.component.html',
  styleUrls: ['./group-tab.component.scss']
})
export class GroupTabComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  form: FormGroup;
  isLogged = false;
  user: Teacher;

  groups: Group[];
  levels = Object.keys(Level);

  constructor(private groupService: GroupService, private tokenStorage: TokenStorageService, private authService: AuthService,
              private translate: TranslateService) { }

  async ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.user = this.tokenStorage.getLoggedUser() as Teacher;
    }
    this.groups = await this.groupService.findAll(this.user.id);
  }
}
