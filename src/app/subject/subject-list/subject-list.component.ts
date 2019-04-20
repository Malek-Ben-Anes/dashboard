import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'app/models/Subject';
import { HttpErrorResponse } from '@angular/common/http';
import { SubjectService } from 'app/services/subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Level } from 'app/models/Level';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  @Input('subjects') subjects: Subject[];
  levels = Object.keys(Level);

  constructor() { }

  ngOnInit() {}
}
