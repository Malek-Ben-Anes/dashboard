import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output, OnChanges } from '@angular/core';
import { Group } from 'app/models/Group';
import { BASE_URL } from 'app/app.component';
import { Student } from 'app/models/Student';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { group } from '@angular/animations';
import { Level } from 'app/models/Level';
import { GroupService } from 'app/services/group.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnChanges {

  BASE_URL: string = BASE_URL;

  @Input('group') group: Group;
  @Input('isNew') isNew: boolean;

  @Output()
  refreshEvent = new EventEmitter<Group>();

  levels = Object.keys(Level);

  groupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private translate: TranslateService) { }

  ngOnInit() {
    this.initGroupForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initGroupForm();
    if (this.groupForm != null && changes.group != null) {
      this.group = changes.group.currentValue;
      this.updateForm(this.group);
    }

    if (changes.isNew != null) {
      this.isNew = changes.isNew.currentValue;
    }
  }

  onSubmit() {
    this.getSubmitedData();
    if (this.group.id == null) {
      this.save(this.group);
    } else {
      this.update(this.group);
    }
  }

  private initGroupForm() {
    if (this.groupForm != null) {
      return;
    }

    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      description: [''],
    });
  }

  private updateForm(group: Group): void {
    this.groupForm.patchValue({
      name: group.name,
      description: group.description
    });
    const toSelect = this.levels.find(level => level === this.group.level);
    this.groupForm.get('level').setValue(toSelect);
  }

  private save(groupRequest: Group) {
    this.groupService.save(groupRequest)
        .then(groupData => {groupData.students = this.group.students; this.group = groupData})
        .then(groupData => { this.updateForm(this.group); this.refreshEvent.emit(this.group); })
        .catch(err => console.log(err));
  }

  private update(groupRequest: Group) {
    this.groupService.update(groupRequest)
        .then(groupData => {groupData.students = this.group.students;
                            this.group = groupData;
                            this.updateForm(this.group);
                            this.refreshEvent.emit(this.group);
                          })
        .catch(err => console.log(err));
  }

  private getSubmitedData() {
    this.group.name = this.extractDataFromField('name');
    this.group.level =  this.extractDataFromField('level');
    this.group.description = this.extractDataFromField('description');
  }

  private extractDataFromField(property: string): any {
    return this.groupForm.get(property).value;
  }
}
