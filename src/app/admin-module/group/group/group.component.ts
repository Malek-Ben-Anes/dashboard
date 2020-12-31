import {Component, OnDestroy, OnInit} from '@angular/core';
import {Group} from '@app/models/Group.model';
import {ActivatedRoute} from '@angular/router';
import {BASE_URL} from '@app/app.component';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import { GroupService } from '@app/services/group.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit, OnDestroy {
  readonly tabIndex = {'EDIT_CLASS': 0, 'TIME_TABLE': 1, 'STUDENTS': 2, 'MARKS': 3};
  readonly BASE_URL: string = BASE_URL;

  selected = new FormControl(0);
  tabs;

  currentGroup: Group;
  _subscription: Subscription;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
    this.tabs = this.updateTabs();
    const groupId = this.route.snapshot.params['id'];
    if (groupId) {
      this._subscription = this.groupService.findById(groupId).subscribe((group) => {
        this.currentGroup = group;
        this.tabs = this.updateTabs();
      });
    }
  }

  private updateTabs() {
    return [
      {'label': 'All.text.edit', 'disabled': false},
      {'label': 'All.text.timeTable.tab.name', 'disabled': !this.currentGroup},
      {'label': 'All.text.students.label', 'disabled': !this.currentGroup},
      {'label': 'All.text.marks.tab.name', 'disabled': !this.currentGroup},
    ];
  }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  ngOnDestroy() {
    if (this._subscription) {
      this.groupService.clearGroup();
      this._subscription.unsubscribe();
    }
  }
}
