import {Component, OnInit} from '@angular/core';
import {Group} from '@app/models/Group.model';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {GroupService} from '@app/services/group.service';
import {Level} from '@app/models/enums/Level';
import {StudentService} from '@app/services/student.service';
import {BASE_URL} from '@app/app.component';
import {Teacher} from '@app/models/Teacher.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  BASE_URL: string = BASE_URL;
  tabIndex = {'STUDENTS': 0, 'TIME_TABLE': 1, 'MARKS': 2};
  tabs;

  selected = new FormControl(0);
  teacher: Teacher;

  group: Group;

  groupForm: FormGroup;

  levels = Object.keys(Level);

  groupStudentsForm: FormGroup;

  constructor(private groupService: GroupService, private studentService: StudentService,
    private route: ActivatedRoute, private translate: TranslateService) { }

  async ngOnInit() {
    this.tabs = await [
      {'label': 'All.text.students.tab.name'},
      {'label': 'All.text.timeTable.tab.name'},
      {'label': 'All.text.marks.tab.name'},
    ];
    const groupId = await this.route.snapshot.params['id'];
    this.groupService.findById(groupId)
        .subscribe((group) => {
          this.group = group;
          console.log(this.group);
        });
  }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
