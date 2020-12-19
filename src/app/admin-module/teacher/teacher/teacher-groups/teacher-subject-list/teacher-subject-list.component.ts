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
import { TokenStorageService } from '@app/services/auth/token-storage.service';

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
  subjectsPerLevel: Subject[];

  subjectsForm: FormGroup;
  checkedOptions = [];

  lessonsAssignedToTeacher: Lesson[];

  isRtl: string = 'ltr';

  constructor(private fb: FormBuilder, private subjectService: SubjectService, private storage: TokenStorageService,
              private lessonService: LessonService, private translate: TranslateService) { }

  ngOnInit() {
    this.isRtl = this.storage.isRtl() ? 'rtl' : 'ltr';
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

  private createCheckBox(subjectId: Subject, groupId: string) {
    if (_.find(this.lessonsAssignedToTeacher, {subject: {id: subjectId}, group: {id: groupId}, teacher: {id: this.teacher.id}})) {
      return new FormControl(true);
    }
    return new FormControl(false);
  }

  private updateSubjects(subjects: Subject[]): SubjectCheckBox[] {
    return _.map(subjects, (subject) => {
      return new SubjectCheckBox(subject.id, subject.name);
    });
  }

  onUpdate(ischecked, subject: SubjectCheckBox) {
    if (ischecked) {
      this.save(subject.id);
    } else {
      this.delete(subject.id);
    }
  }

  private save(subjectId: string) {
    const request = new CreateLessonRequest(this.teacher.id, subjectId, this.selectedGroup.id);
    this.lessonService.create(request).subscribe((lesson: Lesson) => this.lessonsAssignedToTeacher.push(lesson));
  }

  delete(subjectId: string) {
    const lessonId = new LessonIdRequest(this.teacher.id, subjectId, this.selectedGroup.id);
    this.lessonService.delete(lessonId)
        .subscribe((l) => this.lessonsAssignedToTeacher.slice(null));// TODO slice
  }
}
class SubjectCheckBox {
  id: string;
  name: string;

  constructor(_id: string, _name: string) {
    this.id = _id;
    this.name = _name;
  }
}
