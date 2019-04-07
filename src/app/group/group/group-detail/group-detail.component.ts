import { Component, OnInit, Input } from '@angular/core';
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

  @Input('group') group: Group;
  
  groupToChild: Observable<Group>;

  ready: boolean = false;

  groupForm: FormGroup;

  levels = Object.keys(Level);

  groupStudentsForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private studentService: StudentService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.group);
    this.initGroupForm();
  }

  initGroupForm() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  initStudentsForm() {
    this.groupStudentsForm = this.formBuilder.group({
      name: ['', Validators.required],
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

  getSubmitedData() {
    this.group.name = this.groupForm.get('name').value;
    this.group.description = this.groupForm.get('description').value;
    //this.group.students = this.gr
  }

}
