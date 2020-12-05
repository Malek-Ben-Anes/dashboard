import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Subject } from '@app/models/Subject';
import { HttpErrorResponse } from '@angular/common/http';
import { SubjectService } from '@app/services/subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Level } from '@app/models/Level';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit, OnChanges {

  @Input('subjects')
  subjects: Subject[];

  levels = Object.keys(Level);

  @Output() subjectSelected = new EventEmitter<Subject>();

  constructor(private translate: TranslateService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.subjects != null) {
      this.subjects = changes.subjects.currentValue;
    }
  }

  onSelectSubject(subject: Subject): void {
    this.subjectSelected.emit(subject);
  }
}
