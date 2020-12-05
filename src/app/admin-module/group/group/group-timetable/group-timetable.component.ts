import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '@app/models/Group';
import { BASE_URL } from '@app/app.component';
import { GroupService } from '@app/services/group.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-group-timetable',
  templateUrl: './group-timetable.component.html',
  styleUrls: ['./group-timetable.component.scss']
})
export class GroupTimetableComponent implements OnInit {

  @Input('group') group: Group;

  @Output()
  refreshEvent = new EventEmitter<Group>();

  BASE_URL = BASE_URL;
  response;

  selectedFile: File
  isUploading = false;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.isUploading = true;
    this.groupService.uploadTimeTable(this.group.id, this.selectedFile)
    .then((group: Group) => {
        this.isUploading = false;
        this.group = group;
        this.group.timeTableUrl = group.timeTableUrl + '?random+\=' + Math.random();
        this.refreshEvent.emit(this.group);
      })
      .catch(err => {
        this.isUploading = false;
        alert('Upload Emploi du temps a echoué');
      });
  }
}
