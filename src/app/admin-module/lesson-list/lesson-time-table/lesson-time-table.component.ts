import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../lesson-list.component';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lesson-time-table',
  templateUrl: './lesson-time-table.component.html',
  styleUrls: ['./lesson-time-table.component.scss']
})
export class LessonTimeTableComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
