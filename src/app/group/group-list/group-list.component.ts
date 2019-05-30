import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/Group';
import { Level } from 'app/models/Level';
import { GroupService } from 'app/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups: Group[];
  levels = Object.keys(Level);

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.findAll();
  }

  private findAll(): void {
    this.groupService.findAll().then(groups => this.groups = groups)
        .catch(err => console.log(err));
  }
}
