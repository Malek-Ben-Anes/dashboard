import * as _ from 'lodash';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { SubjectService } from 'app/services/subject.service';
import { Group } from 'app/models/Group';
import { Subject } from 'app/models/Subject';
import { Level } from 'app/models/Level';
import { LessonService } from 'app/services/lesson.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Lesson } from 'app/models/Lesson';
import { Teacher } from 'app/models/Teacher';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-subject-list',
  templateUrl: './teacher-subject-list.component.html',
  styleUrls: ['./teacher-subject-list.component.scss']
})
export class TeacherSubjectListComponent implements OnInit, OnChanges {
  // URL dynamic fields form : https://alligator.io/angular/reactive-forms-formarray-dynamic-fields/
  // http://marcusresell.com/2018/07/18/dynamic-checkbox-angular/

  @Input('selectedGroup') selectedGroup: Group;
  @Input('lessons') lessons: Lesson[];
  @Input('teacher') teacher: Teacher;

  subjects: Subject[];

  subjectsPerLevel: Subject[];

  subjectsForm: FormGroup;
  checkedOptions = [];

  constructor(private fb: FormBuilder, private subjectService: SubjectService, private lessonService: LessonService) { }

  ngOnInit() {
    this.constructView(this.selectedGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedGroup = changes.selectedGroup.currentValue;
    this.constructView(this.selectedGroup);
  }

  private constructView(selectedGroup: Group) {
    this.initForm();
    this.subjectService.findAll()
                       .then(subjects => {
                         this.subjects = subjects;
                         this.subjectsPerLevel = this.subjectService.filter( this.subjects, selectedGroup.level);
                         this.updateForm();
                        })
      .catch(err => console.log('check error: ', err))
  }

  submit() {
    const checkedOptions = this.subjectsForm.value.checkedOptions
      .map((checked, index) => checked ? { id: this.checkedOptions[index].id } : null)
      .filter(value => value !== null);
    const uncheckedOptions = _.differenceBy(this.subjectsPerLevel, checkedOptions, 'id');
    _.forEach(checkedOptions, checkedOption => { this.save(this.teacher, this.findSubject(checkedOption.id), this.selectedGroup )});
    _.forEach(uncheckedOptions, uncheckedOption => { this.delete(this.teacher, this.findSubject(uncheckedOption.id), this.selectedGroup )});
  }

  private initForm() {
    const formControls = this.checkedOptions.map(control => new FormControl(false));
    this.subjectsForm = this.fb.group({
      checkedOptions: new FormArray(formControls)
    });
  }

  private updateForm() {
    this.checkedOptions = this.updateSubjects(this.subjectsPerLevel);
    const formControls = this.createCheckBoxes();
    this.subjectsForm = this.fb.group({checkedOptions: new FormArray(formControls)});
  }

  private createCheckBoxes() {
    return _.map(this.checkedOptions, subject => this.createCheckBox(subject.id, this.selectedGroup.id))
  }

  private createCheckBox(subjectId: Subject, groupId: string) {
    if (_.find(this.lessons, {id: {subjectId: subjectId, groupId: groupId}})) {
      return new FormControl(true);
    }
    return new FormControl(false);
  }

  private updateSubjects(subjects: Subject[]) {
    return _.map(subjects, subject => {return {id: subject.id, name: subject.name};});
  }

  private save(teacher: Teacher, subject: Subject, group: Group) {
    const lesson = this.createNewLesson(teacher, subject, group);
    this.lessonService.saveLesson(lesson).subscribe((lessn: Lesson) => this.lessons.push(lessn));
  }

  delete(teacher: Teacher, subject: Subject, group: Group) {
    const lesson = this.createNewLesson(teacher, subject, group);
    this.lessonService.delete(lesson).subscribe(/*(lessn: Lesson) => this.lessons.slice(this.find)*/);
  }

  createNewLesson(teacher: Teacher, subject: Subject, group: Group) {
   const lesson = new Lesson();
    lesson.id.teacherId = teacher.id;
    lesson.id.subjectId = subject.id;
    lesson.id.groupId = group.id;
    lesson.name = subject.name;
    lesson.groupName = group.name;
    lesson.teacherName = teacher.name;
    lesson.subjectName = subject.name;
    return  lesson;
  }

  private findSubject(subjectId: string): Subject {
    return _.find(this.subjects, {id: subjectId})
  }
}
