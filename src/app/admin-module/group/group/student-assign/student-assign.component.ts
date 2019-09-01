import * as _ from 'lodash';
import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { GroupService } from 'app/services/group.service';
import { Observable } from 'rxjs';
import { BASE_URL } from 'app/app.component';

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

  initial: any = [];
  todo: any = [];
  done: any = [];

  constructor(private studentService: StudentService, private groupService: GroupService) { }

  ngOnInit() {
    this.initDoneArray();
    this.findAllStudents();
  }

  onSaveStudents(): void {
    const added = this.arrayDifferenceByOrder(this.done, this.initial);
    const eliminated = this.arrayDifferenceByOrder(this.initial, this.done);
    // Add some students to current group
    const addedStudentToGroup: Student[] = _.intersectionBy(this.allStudents, added, 'id');
    this.addStudentsToGroup(addedStudentToGroup);
    // Delete some students from current group
    const deletedStudentFromGroup: Student[] = _.intersectionBy(this.allStudents, eliminated, 'id');
    this.deletedStudentFromGroup(deletedStudentFromGroup);
    console.log('add', addedStudentToGroup, 'delete', deletedStudentFromGroup);
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

    if (arrA === undefined || arrB === undefined) {
      return [];
    }

    //let difference = arrA.filter(item => arrB.indexOf(item) < 0);
    let difference = arrA.filter( obj =>  !arrB.some( obj2 => obj.id == obj2.id)  );
    return difference
  }


  private initTodoArray() {
    _.differenceBy(this.allStudents, this.group.students, 'id')
     .map((student: Student) => this.pushInArray(student, this.todo));
  }

  private initDoneArray() {
    this.group.students.forEach(student => {
      this.pushInArray(student, this.initial);
      this.pushInArray(student, this.done)
    });
  }

  private findAllStudents() {
    this.studentService.findAll()
        .then(students => this.allStudents = students)
        .then(students => this.initTodoArray())
        .catch(err => console.log(err));
  }

  /**
   * THIS FUNCTION IS TO FULL TODO AND DONE ARRAY OF DATA FROM ALLSTUDENTS AND GROUP.STUDENTS
   * @param student
   * 
   */
  private pushInArray(student: Student, arr: any) {
    let studentI = {
      id: student.id, firstname: student.firstname,
      lastname: student.lastname,
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
  firstname?: string,
  lastname?: string,
  email?: string,
  photo?: string,
  group?: string,
}