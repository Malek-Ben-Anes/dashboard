import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { Level } from 'app/models/Level';
import { StudentService } from 'app/services/student.service';
import { TokenStorageService } from 'app/auth/token-storage.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  allGroups: Group[];
  groups: Group[];

  markForm: FormGroup;
  levels = Object.keys(Level);
  level: Level;

  authority: string;
  authId: string;
  private roles: string[];

  @Output() groupSelected = new EventEmitter<Group>();

  constructor(private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private groupService: GroupService, private studentService: StudentService) { }

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
      this.groupService.findAll().subscribe(groups => { this.allGroups = groups; console.log(this.allGroups); }, err => console.log(err));
    } else if (this.authority = 'pm') {
      this.groupService.findAll(this.authId).subscribe(groups => this.allGroups = groups, err => console.log(err));
    }
  }

  onSubmit() {
    this.level = this.markForm.get('level').value;
    const group: Group = this.markForm.get('group').value;
    this.groupSelected.emit(group);

    console.log(this.groupSelected);


    // to call service by authenticated user role 

    //this.studentService.getGroupStudents(this.selectedGroup.id).subscribe(students => this.students = students);
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
      this.groups = this.allGroups.filter(group => levelSelected == group.level);
    }
  }
}
