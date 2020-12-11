import {Component, OnInit, Input} from '@angular/core';
import {Teacher} from '@app/models/Teacher.model';
import {Group} from '@app/models/Group';

@Component({
  selector: 'app-teacher-manage-groups',
  templateUrl: './teacher-manage-groups.component.html',
  styleUrls: ['./teacher-manage-groups.component.scss'],
})
export class TeacherManageGroupsComponent implements OnInit {
  @Input('teacher')
  teacher: Teacher;

  selectedGroup: Group;

  constructor() { }

  ngOnInit() {
  }

  onSelectGroup(group: Group) {
    this.selectedGroup = group;
  }
}
