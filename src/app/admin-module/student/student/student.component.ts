import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Student } from '@app/models/Student.model';
import { StudentService } from '@app/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { createStudentRequest } from '@app/models/requests/student/CreateStudent.model';
import { UpdateStudentRequest } from '@app/models/requests/student/UpdateStudent.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnChanges {
  readonly tabIndex = {'PROFILE': 0, 'PASSWORD': 1, 'BULLETIN': 2, 'TIME_TABLE': 3};
  isNew = true;
  tabs = this.updateTabs();

  selected = new FormControl(0);
  student: Student;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private translate: TranslateService) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    if (id != null && this.isNew) {
      this.getStudent(id);
    } else {
      this.student = new Student();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.student = changes.student.currentValue;
  }

  private getStudent(id: string): void {
    this.studentService.getById(id).subscribe(
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
  onUpdate(request: createStudentRequest | UpdateStudentRequest): void {
    if ( this.isNew ) {
      this.create(<createStudentRequest>request);
    } else {
      this.update(<UpdateStudentRequest>request);
    }
  }

  /**
 * Get event from child Component and refersh student
 * @param studentToPersist
 */
  refresh(updateStudent: Student) {
    this.student = updateStudent;
  }

  private update(studentRequest: UpdateStudentRequest): void {
    this.studentService.update(this.student.id, studentRequest).subscribe((StudentData) => {
      this.student = StudentData;
      this.tabs = this.updateTabs();},
    (err) => console.log(err));
  }

  private create (studentRequest: createStudentRequest): void {
    this.studentService.create(studentRequest).subscribe((student) => {
        this.student = student;
        this.isNew = false;
        this.tabs = this.updateTabs();
      }, (err) => {
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
