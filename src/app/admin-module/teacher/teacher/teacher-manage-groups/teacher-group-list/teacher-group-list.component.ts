import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Group} from '@app/models/Group';
import {GroupService} from '@app/services/group.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teacher-group-list',
  templateUrl: './teacher-group-list.component.html',
  styleUrls: ['./teacher-group-list.component.scss'],
})
export class TeacherGroupListComponent implements OnInit {
  readonly colors = ['primary', 'accent', 'primary', 'basic'];

  @Output('selectedGroup')
  selectedGroupEmitter = new EventEmitter<Group>();

  groups: Group[];

  getColor(index: number): string {
    return this.colors[index % 4];
  }

  constructor(private groupService: GroupService, private translate: TranslateService) {}

  ngOnInit() {
    this.groupService
        .findAll()
        .subscribe((groups) => {
          this.groups = groups;
          if (groups.length > 0) {
            this.selectedGroupEmitter.emit(groups[0]);
          }
        }, (err) => console.log(err));
  }

  onSelectGroup(group: Group): void {
    this.selectedGroupEmitter.emit(group);
  }
}
