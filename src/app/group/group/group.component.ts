import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Group } from 'app/models/Group';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Level } from 'app/models/Level';
import { StudentService } from 'app/services/student.service';
import { Observable } from 'rxjs';
import { BASE_URL } from 'app/app.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  ready = false;

  group: Group;

  groupToChild: Observable<Group>;

  groupForm: FormGroup;

  levels = Object.keys(Level);

  groupStudentsForm: FormGroup;

  constructor(private groupService: GroupService, private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id !== undefined) {
      this.getGroup(id);
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

  private getGroup(id: string) {

    this.groupService.getSingleGroup(id)
      .subscribe(group => {
        this.group = group;
        this.group.students = [];
        console.log(this.group);
        this.getGroupStudents(this.group.id);
        
        // this.ready = true;
        //this.updateForm(this.group);
      },
        (err: HttpErrorResponse) => {
          this.group = new Group();
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }

  refreshGroup(group: Group) {
    this.group = group;
    console.log('******', group);
  }

  private getGroupStudents(id: string) {
    this.studentService.getGroupStudents(id)
      .subscribe(students => { this.group.students = students; 
        console.log(this.group);
                      //this.groupToChild = new Observable<Group>(observer => observer.next(this.group));
                      this.ready = true;
                    });
  }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
