import {Component, OnInit, Input} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {

  BASE_URL = environment.resourceEndpoint;
  @Input('student') student: Student;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}
