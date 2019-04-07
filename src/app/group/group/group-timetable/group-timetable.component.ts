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

  @Output()
  Updatedgroup = new EventEmitter<Group>();

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
    this.groupService.uploadTimeTable(this.group.id, this.selectedFile)
    .subscribe((response: HttpResponse<Group>) => {
      this.isUploading = true;
      if (response.type === 4) {
        this.isUploading = false;
        this.group.timetabeUrl = response.body.timetabeUrl + '?random+\=' + Math.random();
        this.Updatedgroup.emit(this.group);
        console.log(this.group);
      }
    }, err => {
      alert('bulletin uploaded est echoué');
      this.isUploading = false;
    });
  }
}
