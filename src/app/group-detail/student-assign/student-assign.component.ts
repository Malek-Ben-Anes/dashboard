import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { GroupService } from 'app/services/group.service';

@Component({
  selector: 'app-student-assign',
  templateUrl: './student-assign.component.html',
  styleUrls: ['./student-assign.component.scss']
})
export class StudentAssignComponent implements OnInit {

  @Input() group: Group;

  students: Student[];

  todo: any = [];

  done: any = [];

  constructor(private studentService: StudentService, private groupService: GroupService) {}

  ngOnInit() {
    this.getAllStudents();
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(this.todo);
      console.log(this.done);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log(this.todo);
      console.log(this.done);
    }
  }

  private getAllStudents() {
    this.studentService.getStudents()
      .subscribe(students => { this.students = students; this.students.forEach(student => this.pushTodo(student)) });
  }

  private pushTodo(student: Student) {
    let studentI = {
      id: student.id, firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      photo: student.photo
    }
    this.students.forEach(student => this.todo.push(studentI));
  }
}

interface Todo {
  id?: number,
  firstname?: string,
  lastname?: string,
  email?: string,
  photo?: string,
}