import {Component, OnInit} from '@angular/core';
import {Group} from '@app/models/Group.model';
import {BASE_URL} from '@app/app.component';
import {Subscription} from 'rxjs';
import { GroupService } from '@app/services/group.service';

@Component({
  selector: 'app-group-timetable',
  templateUrl: './group-timetable.component.html',
  styleUrls: ['./group-timetable.component.scss'],
})
export class GroupTimetableComponent implements OnInit {
  readonly BASE_URL = BASE_URL;

  currentGroup: Group;
  _subscription: Subscription;

  response;

  selectedFile: File
  isUploading = false;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this._subscription = this.groupService.getGroup().subscribe((group) => {
      this.currentGroup = group;
      if (group) {
        this.currentGroup.timeTableUrl = group.timeTableUrl + '?random+\=' + Math.random();
      }
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.isUploading = true;
    this.groupService.uploadTimeTable(this.currentGroup.id, this.selectedFile)
        .subscribe((group: Group) => {
          this.isUploading = false;
          this.currentGroup.timeTableUrl = group ? group.timeTableUrl + '?random+\=' + Math.random() : null;
          alert('Upload Emploi du temps a reussi');
        }, (err) => {
          this.isUploading = false;
          alert('Upload Emploi du temps a echoué');
        }, () => this.isUploading = false);
  }
}
