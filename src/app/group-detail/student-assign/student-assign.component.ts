import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { GroupService } from 'app/services/group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-assign',
  templateUrl: './student-assign.component.html',
  styleUrls: ['./student-assign.component.scss']
})
export class StudentAssignComponent implements OnInit {

  //@Input('groupToChild') groupToChild: Observable<Group>;

  @Input('group') group: Group;;

  Allstudents: Student[];

  initial: any = [];
  todo: any = [];
  done: any = [];

  constructor(private studentService: StudentService, private groupService: GroupService) { }

  ngOnInit() {

    // this.groupToChild.subscribe(data => {
    //   console.log('data');
    console.log('********');
    console.log(this.group);
      
    // })
    this.getAllStudents();

    this.initDoneArray();
  }

//   ngOnChanges(changes: SimpleChanges) {
//     // only run when property "data" changed
//     if (changes['group']) {
//       this.initDoneArray();
//     }
// }

  private getAllStudents() {
    this.studentService.getStudents()
      .subscribe(students => {
        this.Allstudents = students;
        this.initTodoArray();
      });
  }

  onSaveStudents(): void {

    let studentsToUpdate = this.arrayDifference(this.initial, this.done);
    
    console.log(studentsToUpdate);

    //save all students from differences
    studentsToUpdate.forEach(student => {
      this.studentService.updateStudent(student);
    });
  }


  private initTodoArray() {

    //push the different students in the pushTodo array
    this.arrayDifference(this.Allstudents, this.group.students)
      // <-   return the difference betwenn two arrays
      .forEach(student => this.pushInArray(student, this.todo));
  }

  private initDoneArray() {
    console.log(this.group);
    this.group.students.forEach(student => { this.pushInArray(student, this.initial); 
                                            this.pushInArray(student, this.done) });
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
    if (arrA !== []) {
      difference = arrA.filter(x => !arrB.includes(x));
    } else if (arrB == []) {
      difference = arrB.filter(x => !arrA.includes(x));
    } else {
      return [];
    }
    return difference
  }

  // private arrayDifference(arrA: any[], arrB: any []) {

  //   let difference = arrA.filter(x => !arrB.includes(x));
  //   return difference
  // }

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
}

interface Todo {
  id?: number,
  firstname?: string,
  lastname?: string,
  email?: string,
  photo?: string,
}