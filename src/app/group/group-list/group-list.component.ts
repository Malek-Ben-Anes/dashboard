import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/Group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Level } from 'app/models/Level';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];

  newGroup: Group = new Group();

  groupForm: FormGroup;

  levels = Object.keys(Level);

  constructor(private formBuilder: FormBuilder, private groupService: GroupService) { }

  ngOnInit() {
    this.initForm();
    this.getGroups();
  }

  initForm() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
    });
  }



  onSubmit() {
    this.getSubmitedData();
    console.log(this.newGroup);

    if (this.newGroup.id !== undefined) {

      this.updateGroup(this.newGroup);
    }
    else
      this.saveGroup(this.newGroup);
  }

  getSubmitedData() {
    this.newGroup.name = this.extractFieldData('name');
    this.newGroup.level = this.extractFieldData('level');
    this.newGroup.description = this.extractFieldData('description');
  }

  private extractFieldData(property: string): any {
    return this.groupForm.get(property).value;
  }

  private getGroups(): void {
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups,
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        }
      );
  }

  private saveGroup(groupRequest: Group): void {
    this.groupService.saveGroup(groupRequest)
      .subscribe(group => {
        this.initForm(); console.log("Subject created");
        this.newGroup = new Group();
        this.getGroups();
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }

  private updateGroup(groupRequest: Group): void {
    this.groupService.updateGroup(groupRequest)
      .subscribe(group => { groupRequest = group; console.log("subject updated") },
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
  // onClick(subject: Subject) {
  //   console.log(subject);
  //   this.newSubject = subject;
  //   this.updateForm(this.newSubject);
  // }

  // clickMessage = '';

  // public onClickMe() {
  //   this.clickMessage = 'You are my hero!';
  // }
}
