import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'app/services/group.service';
import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { Level } from 'app/models/Level';
import { StudentService } from 'app/services/student.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  groups: Group[];

  markForm: FormGroup;
  levels = Object.keys(Level);
  level: Level;

  @Output() selectedGroup = new EventEmitter<Group>();
  
  
  //group: Group;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private studentService: StudentService) { }

  ngOnInit() {
    this.getgroups();
    this.initForm();
  }

  initForm() {
    this.markForm = this.formBuilder.group({
      level: [null, Validators.required],
      group: [null, Validators.required],
    });
  }


  private getgroups() {
    this.groupService.getGroups().subscribe(groups => this.groups = groups, err => console.log(err) );
  }


  onSubmit() {
    this.level = this.markForm.get('level').value;
    const group: Group = this.markForm.get('group').value;
    this.selectedGroup.emit(group);

    console.log(this.selectedGroup);
    console.log(group);


    // to call service by authenticated user role 

    //this.studentService.getGroupStudents(this.selectedGroup.id).subscribe(students => this.students = students);
  }
}
