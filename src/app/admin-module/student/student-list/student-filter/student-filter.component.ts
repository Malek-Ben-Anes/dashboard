import * as _ from 'lodash';
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Level} from '@app/models/enums/Level';
import {FormGroup, FormBuilder} from '@angular/forms';
import {GroupService} from '@app/services/group.service';
import {Group} from '@app/models/Group.model';
import {Student} from '@app/models/Student.model';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.scss'],
})
export class StudentFilterComponent implements OnInit {
  @Input() students: Student;
  @Output() studentsFilter = new EventEmitter<StudentFilter>();

  studentFilterForm: FormGroup;
  levels = Object.keys(Level);
  groups: Group[] = [];

  studentFilter: StudentFilter = {
    firstName: undefined,
    lastName: undefined,
    level: undefined,
    groupId: undefined,
  };

  constructor(private formBuilder: FormBuilder, private groupService: GroupService) { }

  ngOnInit() {
    this.initForm();
    this.groupService.findAll()
        .subscribe((groups) => this.groups = groups
            , (err) => console.log(err));
  }

  initForm() {
    this.studentFilterForm = this.formBuilder.group({
      firstName: [],
      lastName: [],
      level: [],
      group: [],
    });
  }

  onSearch() {
    this.extractFormValue();

    const compactedFilter = _(this.studentFilter).omitBy(_.isNil).omitBy(_.isEmpty).value();
    const emptyFields = _.isEmpty(compactedFilter);

    if (!emptyFields) {
      this.studentsFilter.emit(compactedFilter);
    } else {
      // Display complete list, when no filter is selected
      this.studentsFilter.emit(undefined);
    }
  }

  private extractFormValue() {
    this.studentFilter = {
      firstName: _.trim(this.studentFilterForm.get('firstName').value),
      lastName: _.trim(this.studentFilterForm.get('lastName').value),
      level: this.studentFilterForm.get('level').value,
      groupId: this.studentFilterForm.get('group').value,
    };
  }
}

export interface StudentFilter {
  firstName: string,
  lastName: string,
  level: Level,
  groupId: string
}
