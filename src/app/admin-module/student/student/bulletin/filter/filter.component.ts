import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Group } from 'app/models/Group';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Level } from 'app/models/Level';
import { GroupService } from 'app/services/group.service';
import { StudentService } from 'app/services/student.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-bulletin',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterBulletinComponent implements OnInit {
  allGroups: Group[];
  groups: Group[];

  markForm: FormGroup;
  levels = Object.keys(Level);
  level: Level;

  authority: string;
  authId: string;
  private roles: string[];

  @Output() groupSelected = new EventEmitter<Group>();

  constructor(private formBuilder: FormBuilder,
              private groupService: GroupService,
              private translate: TranslateService,
              private tokenStorage: TokenStorageService,) { }

  ngOnInit() {
    this.getAuthority();
    this.getGroupsByRole();
    this.initForm();
  }

  initForm() {
    this.markForm = this.formBuilder.group({
      level: [null, Validators.required],
      group: [null, Validators.required],
    });
  }

  private getGroupsByRole() {
    if (this.authority = 'admin') {
      this.groupService.findAll().then(groups => this.allGroups = groups).then(err => console.log(err));
    } else if (this.authority = 'pm') {
      this.groupService.findAll(this.authId).then(groups => this.allGroups = groups).then(err => console.log(err));
    }
  }

  onSubmit() {
    this.level = this.markForm.get('level').value;
    const group: Group = this.markForm.get('group').value;
    this.groupSelected.emit(group);
  }

  private getAuthority() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.authId = this.tokenStorage.getId();
      console.log(this.roles);
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  selectLevel(levelSelected) {
    if (levelSelected !== undefined) {
      this.groups = this.allGroups.filter(group => levelSelected === group.level);
    }
  }
}
