import * as _ from 'lodash';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Student } from 'app/models/Student';
import { SubjectService } from 'app/services/subject.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'app/models/Subject';
import { Level } from 'app/models/Level';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  levelIndex = { 'Niveau 1': 0, 'Niveau 2': 1, 'Niveau 3': 2, 'Niveau 4': 3, 'Niveau 5': 4, 'Niveau 6': 5 };
  tabs = [
    { 'label': 'GLBL.label.LEVEL1', 'level': Level.LEVEL1 },
    { 'label': 'GLBL.label.LEVEL2', 'level': Level.LEVEL2 },
    { 'label': 'GLBL.label.LEVEL3', 'level': Level.LEVEL3 },
    { 'label': 'GLBL.label.LEVEL4', 'level': Level.LEVEL4 },
    { 'label': 'GLBL.label.LEVEL5', 'level': Level.LEVEL5 },
    { 'label': 'GLBL.label.LEVEL6', 'level': Level.LEVEL6 }
  ];

  subjects: Subject[];
  selectedSubjects: Subject[];

  subjectToSave: Subject;

  selected = new FormControl(0);
  levels = Object.keys(Level);
  level: Level;

  constructor(private formBuilder: FormBuilder, private subjectService: SubjectService, private translate: TranslateService) {}

  ngOnInit() {
    this.getSubjects();
    this.findSubjectsByLevel(this.selected.value);
    this.level = <Level> this.levels[this.selected.value];
  }

  onNavigate() {
    this.level = <Level> this.levels[this.selected.value];
    this.findSubjectsByLevel(this.selected.value);
  }

  onSelectSubject(subject: Subject) {
    this.subjectToSave = subject;
  }

  onRefresh(refresh: string) {
    console.log("refresh");
    this.getSubjects();
  }

  private findSubjectsByLevel(indexLevel: number) {
    this.selectedSubjects = _.filter(this.subjects, (subject: Subject) => subject.level === this.levels[indexLevel]);
  }

  private getSubjects(): void {
    this.subjectService.findAll()
      .then(subjects => {
      this.subjects = subjects;
      this.findSubjectsByLevel(this.selected.value);
      }).catch(err => console.log(err));
  }
}
