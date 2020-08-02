import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnChanges {
  isNew = true;
  tabIndex = {'PROFILE': 0, 'PASSWORD': 1, 'BULLETIN': 2, 'TIME_TABLE': 3};
  tabs = this.tabs = this.updateTabs();

  selected = new FormControl(0);
  student: Student;

  constructor(private studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) { }

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
    this.studentService.update(studentRequest).subscribe((StudentData) => {
      this.student = StudentData;
      this.tabs = this.updateTabs();},
    (err) => console.log(err));
  }

  private create (studentRequest: Student): void {
    this.studentService.save(studentRequest).then((student) => {
        this.student = student;
        this.isNew = false;
        this.tabs = this.updateTabs();
      })
      .catch((err) => {
        alert(this.translate.instant('All.text.create.failed.duplicated'));
      });
  }

  updateTabs() {
    return [
      {'label': 'All.tab.EditProfile', 'disabled': false},
      {'label': 'All.text.password', 'disabled': this.isNew},
      {'label': 'All.text.bulletins', 'disabled': this.isNew},
      {'label': 'All.text.timeTable.tab.name', 'disabled': this.isNew}
    ];
  }
}
