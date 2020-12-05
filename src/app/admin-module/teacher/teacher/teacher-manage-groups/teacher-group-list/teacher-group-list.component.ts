import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '@app/models/Group';

@Component({
  selector: 'app-teacher-group-list',
  templateUrl: './teacher-group-list.component.html',
  styleUrls: ['./teacher-group-list.component.scss']
})
export class TeacherGroupListComponent implements OnInit{

  @Input('groups') groups: Group[];

  @Output() groupSelected = new EventEmitter<Group>();

  constructor() {}

  ngOnInit() {
    console.log(this.groups);
    if (this.groups.length > 0) {
      this.groupSelected.emit(this.groups[0]);
    }
  }

  onSelectGroup(group: Group): void {
    this.groupSelected.emit(group);
  }
}
