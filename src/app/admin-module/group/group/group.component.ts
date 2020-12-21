import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {Group} from '@app/models/Group.model';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '@app/services/http/group.service';
import {BASE_URL} from '@app/app.component';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  readonly tabIndex = {'EDIT_CLASS': 0, 'TIME_TABLE': 1, 'STUDENTS': 2, 'MARKS': 3};
  readonly BASE_URL: string = BASE_URL;
  tabs;
  selected = new FormControl(0);


  isNew = true;
  group: Group;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
    this.tabs = this.updateTabs();
    const id = this.route.snapshot.params['id'];
    if (id != null && this.isNew) {
      this.findById(id);
    } else {
      this.group = new Group();
    }
  }

  refresh(group: Group) {
    this.group = group;
  }

  private findById(id: string) {
    this.groupService.findById(id)
        .subscribe((group) => {
          this.group = group;
          this.isNew = false;
          this.tabs = this.updateTabs();
        }, (err) => {
          this.group = new Group();
          this.isNew = true;
        });
  }

  private updateTabs() {
    return [
      {'label': 'All.text.edit', 'disabled': false},
      {'label': 'All.text.timeTable.tab.name', 'disabled': this.isNew},
      {'label': 'All.text.students.label', 'disabled': this.isNew},
      {'label': 'All.text.marks.tab.name', 'disabled': this.isNew},
    ];
  }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
