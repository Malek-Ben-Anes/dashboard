import * as _ from "lodash";
import { Component, OnInit } from '@angular/core';
import { Level } from 'app/models/Level';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { group } from '@angular/animations';
import { Group } from 'app/models/Group';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.scss']
})
export class StudentFilterComponent implements OnInit {


  studentFilterForm: FormGroup;
  levels = Object.keys(Level);
  groups: Group[] = [];

  searchForStudent: SearchStudent = { firstname: undefined,
    lastname: undefined,
    level: undefined,
    group: undefined};

  constructor(private studentsService: StudentService, private formBuilder: FormBuilder, private groupService: GroupService) {}

  ngOnInit() {
    this.initForm();
    this.groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  initForm() {
    this.studentFilterForm = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      level: [null],
      group: [null]
    });
  }

  onSubmit() {
    this.searchForStudent.firstname = this.studentFilterForm.get('firstName').value;
    this.searchForStudent.lastname = this.studentFilterForm.get('lastName').value;
    this.searchForStudent.level = this.studentFilterForm.get('level').value;
    this.searchForStudent.group = this.studentFilterForm.get('group').value;

    const searchResult = _(this.searchForStudent).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value()
    const emptyFields = searchResult === {};

    if (!emptyFields) {
        this.studentsService.SearchForStudent(searchResult);
    } else {
      this.studentsService.emitStudentSubject();
    }
  }
/*
  selectLevel(levelSelected) {
    if (levelSelected !== undefined) {
      this.groups = this.allGroups.filter(group => levelSelected == group.level);
    }
  }*/
}

interface SearchStudent {
  firstname: string,
  lastname: string,
  level: Level,
  group: Group
}
