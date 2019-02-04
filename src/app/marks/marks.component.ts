import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Group } from 'app/models/Group';
import { MarkService } from 'app/services/mark.service';
import { Student } from 'app/models/Student';
import { Mark } from 'app/models/Mark';
import { GroupService } from 'app/services/group.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StudentService } from 'app/services/student.service';
import { Level } from 'app/models/Level';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarkComponent implements OnInit {
//https://hackernoon.com/chatbot-with-angular-5-dialogflow-fdac97fef681
  
  students: Student[];

  groupSelected: Group;
  studentSelected: Student;

  marks: Mark[]; // by student Id

  constructor(private markService: MarkService,  private studentService: StudentService) {
  }

  ngOnInit() {}


  onGroupSelected(group: Group) {
    this.groupSelected = group;
    
    // get all group students 
    this.getStudents(this.groupSelected.id);
  }

  onStudentSelected(student: Student) {
    console.log("studnet selected");
    this.studentSelected = student;
    console.log(this.studentSelected);
  }

  private getStudents(id: number):void {
    this.studentService.getGroupStudents(id)
                        .subscribe(students => {this.students = students; console.log(this.students);}, 
                        err => console.log(err.error ) );
                        }  
}

