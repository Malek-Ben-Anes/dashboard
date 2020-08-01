import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { Group } from 'app/models/Group';
import { GroupService } from 'app/services/group.service';
import { SubjectService } from 'app/services/subject.service';
import { Lesson } from 'app/models/Lesson';
import { LessonService } from 'app/services/lesson.service';

@Component({
  selector: 'app-teacher-manage-groups',
  templateUrl: './teacher-manage-groups.component.html',
  styleUrls: ['./teacher-manage-groups.component.scss']
})
export class TeacherManageGroupsComponent implements OnInit {

  @Input('teacher') teacher: Teacher;

  @Output() modifiedTeacher = new EventEmitter<Teacher>();

  groups: Group[];
  selectedGroup: Group;

  lessonsAssignedToTeacher: Lesson[];


  constructor(private groupService: GroupService, private lessonService: LessonService) { }

  ngOnInit() {
    this.groupService.findAll().subscribe(groups => this.groups = groups, err => console.log(err));
    this.lessonService.findAll(this.teacher.id).then(lessons => this.lessonsAssignedToTeacher = lessons);
  }

  onSelectGroup(group: Group) {
    this.selectedGroup = group;
  }
}
