import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'app/models/Teacher';

@Component({
  selector: 'app-teacher-manage-groups',
  templateUrl: './teacher-manage-groups.component.html',
  styleUrls: ['./teacher-manage-groups.component.scss']
})
export class TeacherManageGroupsComponent implements OnInit {

  @Input('teacher') teacher: Teacher;

  @Output() modifiedTeacher = new EventEmitter<Teacher>();

  constructor() { }

  ngOnInit() {
  }

}
