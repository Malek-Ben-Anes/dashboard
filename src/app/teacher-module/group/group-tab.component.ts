import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/Group';
import { Level } from 'app/models/Level';
import { GroupService } from 'app/services/group.service';
import { BASE_URL } from 'app/app.component';
import { FormGroup } from '@angular/forms';
import { Teacher } from 'app/models/Teacher';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { AuthService } from 'app/services/auth/auth.service';

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

  constructor(private groupService: GroupService, private tokenStorage: TokenStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.findAll();
  }

  private findAll(): void {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.user =  this.tokenStorage.getLoggedUser() as Teacher;
    }
    this.groupService.findAll(this.user.id).then(groups => this.groups = groups)
        .catch(err => console.log(err));
  }
}