import {Component, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Teacher} from '@app/models/Teacher.model';
import {TeacherService} from '@app/services/teacher.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {UpdateTeacherRequest} from '@app/models/requests/teacher/UpdateTeacher.model';
import {CreateTeacherRequest} from '@app/models/requests/teacher/CreateTeacher.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit, OnChanges {
  readonly tabIndex = {'PROFILE': 0, 'PASSWORD': 1, 'GROUPS': 2, 'TIME_TABLE': 3};

  tabs = this.updateTabs();
  isNew = true;
  selected = new FormControl(0);
  teacher: Teacher;

  constructor(private teacherService: TeacherService, private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit() {
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

  private getTeacher(id: string): void {
    this.teacherService.getById(id).subscribe(
        (studentData: Teacher) => {
          this.teacher = studentData;
          this.isNew = false;
          this.tabs = this.updateTabs();
        }, (err: HttpErrorResponse) => alert('Error teacher not found!'));
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

  private update(request: UpdateTeacherRequest): void {
    this.teacherService.update(this.teacher.id, request).subscribe((StudentData) => {
      this.teacher = StudentData;
      this.tabs = this.updateTabs();
    }, (err) => {
      console.log(err);
    });
  }

  private create(request: CreateTeacherRequest): void {
    this.teacherService.create(request).subscribe((StudentData) => {
      this.teacher = StudentData;
      this.isNew = false;
      this.tabs = this.updateTabs();
    }, (err) => {
      alert(this.translate.instant('All.text.create.failed.duplicated'));
    });
  }

  private updateTabs() {
    return [
      {'label': 'All.tab.EditProfile', 'disabled': false},
      {'label': 'All.tab.Password', 'disabled': this.isNew},
      {'label': 'All.text.groups.label', 'disabled': this.isNew},
      {'label': 'All.text.timeTable.tab.name', 'disabled': this.isNew}];
  }
}
