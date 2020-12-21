import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '@app/models/Group.model';
import { BASE_URL } from '@app/app.component';
import { GroupService } from '@app/services/http/group.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
  }
}
