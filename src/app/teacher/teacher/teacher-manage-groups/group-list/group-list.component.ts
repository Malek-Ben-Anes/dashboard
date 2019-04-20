import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'app/models/Group';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {

  @Input('groups') groups: Group[];

  @Output() groupSelected = new EventEmitter<Group>();

  onSelectGroup(group: Group): void {
    this.groupSelected.emit(group);
    console.log(group);
  }
}
