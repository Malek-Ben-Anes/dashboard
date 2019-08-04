import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'app/models/Group';
import { BASE_URL } from 'app/app.component';
import { GroupService } from 'app/services/group.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-group-timetable',
  templateUrl: './group-timetable.component.html',
  styleUrls: ['./group-timetable.component.scss']
})
export class GroupTimetableComponent implements OnInit {

  @Input('group') group: Group;

  BASE_URL = BASE_URL;
  response;

  selectedFile: File

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }
}
