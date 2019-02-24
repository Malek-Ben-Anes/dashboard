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
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  ready: boolean = false;

  group: Group = new Group();

  groupToChild: Observable<Group>;

  groupForm: FormGroup;

  levels = Object.keys(Level);

  groupStudentsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private studentService: StudentService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.initGroupForm();
    this.initStudentsForm();

    let id = this.route.snapshot.params['id'];
    if (id !== undefined) {
      this.getGroup(id);
    }

  }

  initGroupForm() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  updateForm(group: Group): void {
    this.groupForm.patchValue({
      name: group.name,
      description: group.description,
      studentsNumber: group.students.length,
    });

    const toSelect = this.levels.find(level => level == this.group.level);
    this.groupForm.get('level').setValue(toSelect);
  }

  initStudentsForm() {
    this.groupStudentsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.getSubmitedData();
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

  getSubmitedData() {
    this.group.name = this.groupForm.get('name').value;
    this.group.description = this.groupForm.get('description').value;
    //this.group.students = this.gr
  }


  private getGroup(id: number) {

    this.groupService.getSingleGroup(id)
      .subscribe(group => {
        this.group = group;
        this.group.students = [];
        console.log(this.group);
        this.getGroupStudents(this.group.id);
        this.updateForm(this.group);
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


  private getGroupStudents(id: number) {
    this.studentService.getGroupStudents(id)
      .subscribe(students => { this.group.students = students; 
                      //this.groupToChild = new Observable<Group>(observer => observer.next(this.group));
                      this.ready = true;
                    });
  }

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
