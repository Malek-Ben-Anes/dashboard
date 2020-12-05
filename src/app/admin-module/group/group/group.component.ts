import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Group } from '@app/models/Group';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GroupService } from '@app/services/group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Level } from '@app/models/Level';
import { StudentService } from '@app/services/student.service';
import { Observable } from 'rxjs';
import { BASE_URL } from '@app/app.component';
import { Teacher } from '@app/models/Teacher';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  isNew = true;
  BASE_URL: string = BASE_URL;
  tabIndex = {'EDIT_CLASS': 0,  'TIME_TABLE': 1, 'STUDENTS': 2, 'MARKS': 3};
  tabs = this.tabs = this.updateTabs();

  selected = new FormControl(0);
  teacher: Teacher;

  group: Group;

  groupForm: FormGroup;

  levels = Object.keys(Level);

  groupStudentsForm: FormGroup;

  constructor(private groupService: GroupService, private studentService: StudentService,
    private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id != null && this.isNew) {
      this.findById(id);
    } else {
      this.group = new Group();
    }
  }

  refresh(group: Group) {
      this.group = group;
  }

  private findById(id: string) {
    this.groupService.find(id).then(group => this.group = group)
        .then(group => {this.group.students = []; this.isNew = false; this.tabs = this.updateTabs(); })
        .then(group => this.findStudentsByGroupId(this.group.id))
        .catch(err => {this.group = new Group(); this.isNew = true; })
  }

  private findStudentsByGroupId(groupId: string) {
    this.studentService.findStudentsByGroupId(groupId)
        .subscribe(students => this.group.students = students, err => console.log(err));
  }

  private updateTabs() {
    return [
            {'label': 'All.text.edit', 'disabled': false},
            {'label': 'All.text.timeTable.tab.name', 'disabled': this.isNew},
            {'label': 'All.text.students.label', 'disabled': this.isNew},
            {'label': 'All.text.marks.tab.name', 'disabled': this.isNew}
          ];
  }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
