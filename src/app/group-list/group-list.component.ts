import { Component, OnInit } from '@angular/core';
import { Group } from 'app/models/Group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];

  newGroup: Group = new Group();

  groupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService) { }

  ngOnInit() {
    this.initForm();
    this.getGroups();
  }

  initForm() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getGroups(): void {
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

  updateForm(group: Group): void {
    this.groupForm.patchValue({
      name: group.name,
      description: group.description,
      //studentsNumber: group.Number,
    });
  }

  onSubmit() {
    this.getSubmitedData();
    console.log(this.newGroup);
    if(this.newGroup.id !== undefined ) {

    
      this.groupService.updateGroup(this.newGroup)
                          .subscribe(subject => { this.newGroup = subject; console.log("subject updated")},
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
    else 
    this.groupService.saveGroup(this.newGroup)
                        .subscribe(subject => { 
                          this.initForm();
                          console.log("Subject created");
                        this.newGroup =  new Group();
                      this.getGroups();},
                          (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                          console.log("Client-side error occured.");
                          } else {
                          console.log("Server-side error occured.");
                          }
                          });
  }

  getSubmitedData() {
    this.newGroup.name = this.groupForm.get('name').value;
    this.newGroup.description = this.groupForm.get('description').value;  
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
