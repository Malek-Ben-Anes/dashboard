import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Group } from 'app/models/Group';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Level } from 'app/models/Level';
import { StudentService } from 'app/services/student.service';
import { Observable } from 'rxjs';
import { BASE_URL } from 'app/app.component';
import { Teacher } from 'app/models/Teacher';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  isNew = true;
  BASE_URL: string = BASE_URL;
  tabIndex = {'EDIT_CLASS': 0, 'STUDENTS': 1, 'TIMETABLE': 2};
  tabs = this.tabs = this.updateTabs();

  selected = new FormControl(0);
  teacher: Teacher;

  group: Group;

  groupToChild: Observable<Group>;

  groupForm: FormGroup;

  levels = Object.keys(Level);

  groupStudentsForm: FormGroup;

  constructor(private groupService: GroupService, private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id != null && this.isNew) {
      this.findById(id);
    } else {
      this.group = new Group();
    }
  }



  onSubmit() {
    //this.getSubmitedData();
    console.log(this.group);
    if (this.group.id !== undefined) {
      this.groupService.updateGroup(this.group)
        .subscribe(subject => { this.group = subject; console.log("subject updated") },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log(err.error);
              console.log("Client-side error occured.");
            } else {
              console.log(err.error);
              console.log("Server-side error occured.");
            }
          });
    }
  }

  private findById(id: string) {
    this.groupService.find(id).then(group => this.group = group)
    .then(group => {this.group.students = []; this.isNew = false; this.tabs = this.updateTabs(); })
    .then(group => this.getGroupStudents(this.group.id))
    .catch(err => {this.group = new Group(); this.isNew = true; })
  }


  refreshGroup(group: Group) {
    this.group = group;
  }

  private getGroupStudents(id: string) {
    this.studentService.getGroupStudents(id)
      .subscribe(students => { this.group.students = students; 
        console.log(this.group);
                      //this.groupToChild = new Observable<Group>(observer => observer.next(this.group));
                      this.isNew = true;
                    });
  }

  private updateTabs() {
    return [{'label': 'Editer classe', 'disabled': false}, {'label': 'Eleves', 'disabled': this.isNew},
            {'label': 'Emploi du temps', 'disabled': this.isNew}];
  }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
