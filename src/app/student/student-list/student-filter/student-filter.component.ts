import * as _ from 'lodash';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Level } from 'app/models/Level';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { group } from '@angular/animations';
import { Group } from 'app/models/Group';
import { StudentService } from 'app/services/student.service';
import { Student } from 'app/models/Student';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.scss']
})
export class StudentFilterComponent implements OnInit {

  @Input() students: Student;
  @Output() studentsFound = new EventEmitter<Student[] | undefined>();

  studentFilterForm: FormGroup;
  levels = Object.keys(Level);
  groups: Group[] = [];

  searchForStudent: SearchStudent = {
    firstname: undefined,
    lastname: undefined,
    level: undefined,
    group: undefined
  };

  constructor(private formBuilder: FormBuilder, private groupService: GroupService) { }

  ngOnInit() {
    this.initForm();
    this.groupService.findAll().then(groups => this.groups = groups).catch(err => console.log(err));
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
    const emptyFields = _.isEmpty(searchResult);

    if (!emptyFields) {
      const studentFound = this.SearchForStudent(searchResult);
      this.studentsFound.emit(studentFound);
    } else {
      this.studentsFound.emit(undefined);
    }
  }

  private SearchForStudent(studentSearched: SearchStudent): Student[] {
    console.log(studentSearched, this.students);
    const studentsFound: Student[] = _.filter(this.students, studentSearched);
    return studentsFound;
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
