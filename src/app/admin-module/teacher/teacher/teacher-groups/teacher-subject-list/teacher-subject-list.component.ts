import * as _ from 'lodash';
import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {SubjectService} from '@app/services/subject.service';
import {Group} from '@app/models/Group';
import {Subject} from '@app/models/Subject';
import {LessonService} from '@app/services/lesson.service';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {Lesson} from '@app/models/Lesson.model';
import {Teacher} from '@app/models/Teacher.model';
import {TranslateService} from '@ngx-translate/core';
import {LessonIdRequest} from '@app/models/requests/lesson/LessonId.model';
import {CreateLessonRequest} from '@app/models/requests/lesson/CreateLesson.model';

@Component({
  selector: 'app-teacher-subject-list',
  templateUrl: './teacher-subject-list.component.html',
  styleUrls: ['./teacher-subject-list.component.scss'],
})
export class TeacherSubjectListComponent implements OnInit, OnChanges {
  @Input('selectedGroup')
  selectedGroup: Group;

  @Input('teacher')
  teacher: Teacher;

  allSubjects: Subject[];

  lessons: Lesson[];
  subjectsPerLevel: Subject[];

  subjectsForm: FormGroup;
  checkedOptions = [];

  lessonsAssignedToTeacher: Lesson[];

  constructor(private fb: FormBuilder, private subjectService: SubjectService, private lessonService: LessonService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.subjectsForm = this.initForm();
    this.lessonService.findAll(this.teacher.id).subscribe((lessons) => {
      this.lessonsAssignedToTeacher = lessons;
      this.updateForm();
    });
    this.subjectService.findAll().subscribe((subjects) => {
      this.allSubjects = subjects;
      this.subjectsPerLevel = this.subjectService.filter( this.allSubjects, this.selectedGroup.level);
      this.updateForm();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedGroup = changes.selectedGroup.currentValue;
    this.subjectsPerLevel = this.subjectService.filter( this.allSubjects, this.selectedGroup.level);
    this.updateForm();
  }

  private initForm(): FormGroup {
    const formControls = this.checkedOptions.map((control) => new FormControl(false));
    return this.fb.group({
      checkedOptions: new FormArray(formControls),
    });
  }

  private updateForm() {
    this.checkedOptions = this.updateSubjects(this.subjectsPerLevel);
    const formControls = _.map(this.checkedOptions, (subject) => this.createCheckBox(subject.id, this.selectedGroup.id));
    this.subjectsForm = this.fb.group({checkedOptions: new FormArray(formControls)});
  }

  onSave() {
    const checkedOptions = this.subjectsForm.value.checkedOptions
        .map((checked, index) => checked ? {id: this.checkedOptions[index].id} : null)
        .filter((value) => value !== null);
    const uncheckedOptions = _.differenceBy(this.subjectsPerLevel, checkedOptions, 'id');
    _.forEach(checkedOptions, (checkedOption) => {
      this.save(this.teacher, this.findSubject(checkedOption.id), this.selectedGroup );
    });
    _.forEach(uncheckedOptions, (uncheckedOption) => {
      this.delete(this.teacher, this.findSubject(uncheckedOption.id), this.selectedGroup );
    });
  }

  private createCheckBox(subjectId: Subject, groupId: string) {
    if (_.find(this.lessons, {id: {subjectId: subjectId, groupId: groupId}})) {
      return new FormControl(true);
    }
    return new FormControl(false);
  }

  private updateSubjects(subjects: Subject[]) {
    return _.map(subjects, (subject) => {
      return {id: subject.id, name: subject.name};
    });
  }

  private save(teacher: Teacher, subject: Subject, group: Group) {
    const request = new CreateLessonRequest(teacher.id, subject.id, group.id);
    this.lessonService.create(request).subscribe((lesson: Lesson) => this.lessons.push(lesson));
  }

  delete(teacher: Teacher, subject: Subject, group: Group) {
    const lessonId = new LessonIdRequest(teacher.id, subject.id, group.id);
    this.lessonService.delete(lessonId)
        .subscribe((l) => this.lessonsAssignedToTeacher.slice(null));// TODO slice
  }

  private findSubject(subjectId: string): Subject {
    return _.find(this.allSubjects, {id: subjectId});
  }
}
