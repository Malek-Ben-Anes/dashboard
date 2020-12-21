import {Component, OnInit} from '@angular/core';
import {Group} from '@app/models/Group.model';
import {Level} from '@app/models/enums/Level';
import {GroupService} from '@app/services/http/group.service';
import {Routers} from '@app/admin-module/routes/router-link';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  GROUP_DETAIL: string = Routers.APP_GROUP_DETAIL;

  groups: Group[];
  levels = Object.keys(Level);

  constructor(private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
    this.findAll();
  }

  private findAll(): void {
    this.groupService.findAll().subscribe((groups) => this.groups = groups, (err) => console.log(err));
  }
}
