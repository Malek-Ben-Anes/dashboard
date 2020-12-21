import {Component, OnInit, Input} from '@angular/core';
import {Teacher} from '@app/models/Teacher.model';
import {Group} from '@app/models/Group.model';

@Component({
  selector: 'app-teacher-groups',
  templateUrl: './teacher-groups.component.html',
  styleUrls: ['./teacher-groups.component.scss'],
})
export class TeacherGroupsComponent implements OnInit {
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
