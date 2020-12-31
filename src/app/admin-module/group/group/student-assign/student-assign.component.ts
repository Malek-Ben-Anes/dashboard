import {Component, OnInit} from '@angular/core';
import {Group} from '@app/models/Group.model';
import {Student} from '@app/models/Student.model';
import {StudentService} from '@app/services/student.service';
import {BASE_URL} from '@app/app.component';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {PatchGroupStudentsRequest} from '@app/models/requests/group/PatchGroupStudents.model';
import {GroupService} from '@app/services/group.service';

@Component({
  selector: 'app-student-assign',
  templateUrl: './student-assign.component.html',
  styleUrls: ['./student-assign.component.scss'],
})
export class StudentAssignComponent implements OnInit {
  readonly BASE_URL: string = BASE_URL;

  currentGroup: Group;
  _subscription: Subscription;

  unassignedStudents: Student[];
  currentGroupStudents: any[];

  constructor(private studentService: StudentService, private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
    this._subscription = this.groupService.getGroup().subscribe((group) => {
      this.currentGroup = group;
      if (group) {
        this.currentGroupStudents = group.students;
      }
    });
    const groupIsNull = true;
    this.studentService.findAll(groupIsNull).subscribe((students) => this.unassignedStudents = students);
  }

  onAttachStudent(student: Student): void {
    const request = new PatchGroupStudentsRequest();
    request.studentIdsToAssign = [student.id];
    request.studentIdsToDetach = [];
    this.updateStudents(request);
  }

  onDetachStudent(student: Student): void {
    const request = new PatchGroupStudentsRequest();
    request.studentIdsToDetach = [student.id];
    request.studentIdsToAssign = [];
    this.updateStudents(request);
  }

  private updateStudents(request: PatchGroupStudentsRequest) {
    this.groupService.patchGroupStudents(this.currentGroup.id, request)
        .subscribe(() => {
          this.studentService.findAll(true).subscribe((students) => this.unassignedStudents = students);
          this.groupService.findById(this.currentGroup.id).subscribe();
        });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
