import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnChanges {
  isNew = true;
  tabIndex = {'PROFILE': 0, 'PASSWORD': 1, 'MARKS': 2, 'BULLETIN': 3, 'TIME_TABLE': 4};
  tabs = this.tabs = this.updateTabs();

  selected = new FormControl(0);
  student: Student;

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.tabs = this.updateTabs();
    if (id != null && this.isNew) {
      this.getStudent(id);
    } else {
      this.student = new Student();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.student = changes.student.currentValue;
    console.log('***********----', this.student);
  }

  private getStudent(id: string): void {
    this.studentService.getStudentById(id).subscribe(
      (studentData: Student) => {
        this.student = studentData;
        this.isNew = false;
        this.tabs = this.updateTabs();
        console.log(studentData);
      },
      (err: HttpErrorResponse) => {
        this.student = new Student();
        this.isNew = true;
      }
    );
  }

  /**
   * Get event from child Component and update student
   * @param studentToPersist 
   */
  onUpdate(student: Student) {
    if ( this.isNew ) {
      this.create(student);
    } else {
      this.update(student);
    }
  }

  /**
 * Get event from child Component and refersh student
 * @param studentToPersist
 */
  refresh(student: Student) {
    this.student = student;
    console.log('student refreshed');
  }

  private update(studentRequest: Student): void {
    this.studentService.update(studentRequest).then((StudentData) => {
      this.student = StudentData;
      this.tabs = this.updateTabs();
      console.log('student updated', this.student);
    }).catch((err) => console.log(err));
  }

  private create (studentRequest: Student): void {
    this.studentService.saveStudent(studentRequest).subscribe((StudentData) => {
      this.student = StudentData;
      this.isNew = false;
      this.tabs = this.updateTabs();
      console.log('student created', this.student);
    }, (err) => {
      console.log(err)
    });
  }

  updateTabs() {
    return [{'label': 'Edit Profile', 'disabled': false}, {'label': 'Password', 'disabled': this.isNew},
            {'label': 'Marks', 'disabled': this.isNew}, {'label': 'Bulletin', 'disabled': this.isNew},
            {'label': 'Time Table', 'disabled': this.isNew}];
  }
}
