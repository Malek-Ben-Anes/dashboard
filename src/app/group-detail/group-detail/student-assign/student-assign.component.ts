import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-student-assign',
  templateUrl: './student-assign.component.html',
  styleUrls: ['./student-assign.component.scss']
})
export class StudentAssignComponent implements OnInit {

  @Input() group: Group;

  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getAllStudents();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  private getAllStudents() {
    this.studentService.getStudents()
      .subscribe(students => { this.students = students; });
  }
}
