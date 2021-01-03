import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {BASE_URL} from '@app/app.component';
import {GroupService} from '@app/services/group.service';
import {Subscription} from 'rxjs';
import {Group} from '@app/models/Group.model';

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.scss'],
})
export class GroupStudentListComponent implements OnInit {
  readonly BASE_URL: string = BASE_URL;

  @Output()
  studentSelected = new EventEmitter<Student>();

  _subscription: Subscription;
  currentGroup: Group;
  studentList: any[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this._subscription = this.groupService.getGroup().subscribe((group) => {
      this.currentGroup = group;
      this.studentList = group ? group.students : [];
    });
  }

  onSelectStudent(student: Student): void {
    this.studentSelected.emit(student);
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
