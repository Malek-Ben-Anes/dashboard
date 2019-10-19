import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  @Input('student') student: Student;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  getTimetableLink() {
    try {
      return BASE_URL + this.student.group.timetabeUrl;
    } catch(ex) {
      return BASE_URL + undefined;
    }
  }

  getGroupName() {
    try {
      return this.student.group.name + ' Time table';
    } catch(ex) {
      return 'Time table';
    }
  }

}
