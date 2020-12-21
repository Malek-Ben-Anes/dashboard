import * as _ from 'lodash';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Group } from '@app/models/Group.model';
import { Student } from '@app/models/Student.model';
import { StudentService } from '@app/services/student.service';
import { GroupService } from '@app/services/group.service';
import { BASE_URL } from '@app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student-assign',
  templateUrl: './student-assign.component.html',
  styleUrls: ['./student-assign.component.scss']
})
export class StudentAssignComponent implements OnInit {

  //@Input('groupToChild') groupToChild: Observable<Group>;

  @Input('group') group: Group;
  BASE_URL: string = BASE_URL;

  @Output()
  refreshEvent = new EventEmitter<Group>();

  // All available students in all groups.
  allStudents: Student[];
  unassignedStudents: Student[];

  initial: any = [];
  todo: any = [];
  done: any = [];

  constructor(private studentService: StudentService, private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
    this.findUnassignedStudents();
    this.initDoneArray();
  }

  onSaveStudents(): void {
    const added = this.arrayDifferenceByOrder(this.done, this.initial);
    const eliminated = this.arrayDifferenceByOrder(this.initial, this.done);
    // Add some students to current group
    const addedStudentToGroup: Student[] = _.intersectionBy(this.unassignedStudents, added, 'id');
    this.addStudentsToGroup(addedStudentToGroup);
    // Delete some students from current group
    const deletedStudentFromGroup: Student[] = _.intersectionBy(this.unassignedStudents, eliminated, 'id');
    this.deletedStudentFromGroup(deletedStudentFromGroup);
  }

  private addStudentsToGroup(addedStudentToGroup: Student[]) {
    if (_.isEmpty(addedStudentToGroup)) {
      return;
    }
    this.groupService.addStudentsToGroup(this.group.id, addedStudentToGroup)
        .then(students => this.group.students = students)
        .then(students => this.refreshEvent.emit(this.group))
        .catch(err => console.log(err));
  }

  private deletedStudentFromGroup(deletedStudentFromGroup: Student[]) {
    if (_.isEmpty(deletedStudentFromGroup)) {
      return;
    }
    this.groupService.deleteStudentsFromGroup(this.group.id, deletedStudentFromGroup)
        .then(students => this.group.students = students)
        .then(students => this.refreshEvent.emit(this.group))
        .catch(err => console.log(err));
  }

  private arrayDifferenceByOrder(arrA: Student[], arrB: Student[]) {

    if (arrA == undefined || arrB == undefined) {
      return [];
    }

    //let difference = arrA.filter(item => arrB.indexOf(item) < 0);
    let difference = arrA.filter( obj =>  !arrB.some( obj2 => obj.id == obj2.id)  );
    return difference
  }


  private initTodoArray() {
    _.differenceBy(this.unassignedStudents, this.group.students, 'id')
     .map((student: Student) => this.pushInArray(student, this.todo));
  }

  private initDoneArray() {
    this.unassignedStudents.forEach(student => {
      this.pushInArray(student, this.initial);
      this.pushInArray(student, this.done)
    });
  }

  private findUnassignedStudents() {
    this.studentService.findAll()
      .subscribe(students => { 
        this.allStudents = students;
        this.filterUnassignedStudents(students);
        this.initTodoArray();
      },
      err => console.log(err));
  }

  private filterUnassignedStudents(students: Student[]): void {
    this.unassignedStudents = _.filter(students, s => s.group == null);
  }

  /**
   * THIS FUNCTION IS TO FULL TODO AND DONE ARRAY OF DATA FROM ALLSTUDENTS AND GROUP.STUDENTS
   * @param student
   * 
   */
  private pushInArray(student: Student, arr: any) {
    let studentI = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      photo: student.photo,
      group: student.group && student.group.name
    }
    arr.push(studentI);
  }


  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}

interface Todo {
  id?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  photo?: string,
  group?: string,
}