import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Teacher } from '@app/models/Teacher.model';
import { TeacherService } from '@app/services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { UpdateTeacherRequest } from '@app/models/requests/teacher/UpdateTeacher.model';
import { CreateTeacherRequest } from '@app/models/requests/teacher/CreateTeacher.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit, OnChanges {
  readonly tabIndex = { 'PROFILE': 0, 'PASSWORD': 1, 'GROUPS': 2, 'TIME_TABLE': 3 };

  tabs;
  isNew = true;
  selected = new FormControl(0);
  teacher: Teacher;

  constructor(private teacherService: TeacherService, private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit() {
    this.tabs = this.updateTabs();
    const id: string = this.route.snapshot.params['id'];
    if (id != null && this.isNew) {
      this.getTeacher(id);
    } else {
      this.teacher = new Teacher();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.teacher = changes.teacher.currentValue;
  }

  private async getTeacher(id: string) {
    try {
      this.teacher = await this.teacherService.getById(id);
      this.isNew = false;
      this.tabs = this.updateTabs();
    } catch {
      alert('Error teacher not found!');
    }
  }

  onUpdate(request: CreateTeacherRequest | UpdateTeacherRequest) {
    if (this.isNew) {
      this.create(<CreateTeacherRequest>request);
    } else {
      this.update(<UpdateTeacherRequest>request);
    }
  }

  refresh(teacher: Teacher) {
    this.teacher = teacher;
  }

  private async update(request: UpdateTeacherRequest) {
    try {
      this.teacher = await this.teacherService.update(this.teacher.id, request);
      this.tabs = this.updateTabs();
    } catch {
    }
  }

  private async create(request: CreateTeacherRequest) {
    try {
      this.teacher = await this.teacherService.create(request);
      this.isNew = false;
      this.tabs = this.updateTabs();
    } catch {
      alert(this.translate.instant('All.text.create.failed.duplicated'));
    }
  }

  private updateTabs() {
    return [
      { 'label': 'All.tab.EditProfile', 'disabled': false },
      { 'label': 'All.tab.Password', 'disabled': this.isNew },
      { 'label': 'All.text.groups.label', 'disabled': this.isNew },
      { 'label': 'All.text.timeTable.tab.name', 'disabled': this.isNew }];
  }
}
