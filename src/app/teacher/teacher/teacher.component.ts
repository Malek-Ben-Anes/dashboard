import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Teacher } from 'app/models/Teacher';
import { TeacherService } from 'app/services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'app/models/Student';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit, OnChanges {

  isNew = true;
  tabIndex = {'PROFILE': 0, 'PASSWORD': 1, 'GROUPS': 2, 'TIME_TABLE': 3};
  tabs = this.tabs = this.updateTabs();

  selected = new FormControl(0);
  teacher: Teacher;

  constructor(private teacherService: TeacherService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.tabs = this.updateTabs();
    if (id != null && this.isNew) {
      this.getStudent(id);
    } else {
      this.teacher = new Teacher();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.teacher = changes.teacher.currentValue;
  }

  private getStudent(id: string): void {
    this.teacherService.findTeacherById(id).subscribe(
      (studentData: Teacher) => {
        this.teacher = studentData;
        this.isNew = false;
        this.tabs = this.updateTabs();
        console.log(studentData);
      },
      (err: HttpErrorResponse) => {
        this.teacher = new Teacher();
        this.isNew = true;
      }
    );
  }

  /**
   * Get event from child Component and update student
   * @param studentToPersist
   */
  onUpdate(teacher: Teacher) {
    if ( this.isNew ) {
      this.create(teacher);
    } else {
      this.update(teacher);
    }
  }

  /**
 * Get event from child Component and refersh student
 * @param studentToPersist 
 */
  refresh(teacher: Teacher) {
    this.teacher = teacher;
  }

  private update(studentRequest: Teacher): void {
    this.teacherService.updateTeacher(studentRequest).subscribe((StudentData) => {
      this.teacher = StudentData;
      this.tabs = this.updateTabs();
      console.log('teacher updated', this.teacher);
    }, (err) => {
      console.log(err)
    });
  }

  private create (teacherRequest: Teacher): void {
    this.teacherService.saveTeacher(teacherRequest).subscribe((StudentData) => {
      this.teacher = StudentData;
      this.isNew = false;
      this.tabs = this.updateTabs();
      console.log('teacher created', this.teacher);
    }, (err) => {
      console.log(err)
    });
  }

  updateTabs() {
    return [{'label': 'Edit Profile', 'disabled': false}, {'label': 'Password', 'disabled': this.isNew},
            {'label': 'Groups', 'disabled': this.isNew},
            {'label': 'Time Table', 'disabled': this.isNew}];
  }
}
