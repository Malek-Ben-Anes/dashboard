import * as _ from 'lodash';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  // All available students in all groups.
  Allstudents: Student[];

  initial: any = [];
  todo: any = [];
  done: any = [];

  constructor(private studentService: StudentService, private groupService: GroupService) { }

  ngOnInit() {
    this.initDoneArray();
    this.findAllStudents();
  }



  onSaveStudents(): void {

    let added = this.arrayDifferenceByOrder(this.done, this.initial);
    let eliminated = this.arrayDifferenceByOrder(this.initial, this.done);

    console.log(eliminated);
    console.log(added);
    
    //save all students ADDED to group
    added.forEach(student => {
      let entity = this.Allstudents.find(x => x.id === student.id);
      entity.group = this.group;
      this.updateStudent(entity);
    });

    //save all students ELIMINATED from group
    eliminated.forEach(student => {
      let entity = this.Allstudents.find(x => x.id === student.id);
      entity.group = undefined;
      this.updateStudent(entity);
    });

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
    _.differenceBy(this.Allstudents, this.group.students, 'id')
     .map((student: Student) => this.pushInArray(student, this.todo));
    console.log(this.todo, this.Allstudents, this.group.students);
  }

  private initDoneArray() {
    this.group.students.forEach(student => {
      this.pushInArray(student, this.initial);
      this.pushInArray(student, this.done)
    });
  }

  private findAllStudents() {
    this.studentService.findAll()
        .then(students => this.Allstudents = students)
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
      photo: student.photo
    }
    arr.push(studentI);
  }

  private arrayDifference(arrA: Student[], arrB: Student[]) {

    if (arrA === undefined || arrB === undefined) {
      return [];
    }

    let difference;
    if (arrA.length >= arrB.length) {

      difference = arrA.filter(item => !arrB.some(other => item.id === other.id));

    } else if (arrA.length < arrB.length) {
      difference = arrB.filter(item => !arrA.some(other => item.id === other.id));
    }
    return difference
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

  private updateStudent(student: Student) {
    this.studentService.updateStudent(student);
  }
}

interface Todo {
  id?: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  photo?: string,
}