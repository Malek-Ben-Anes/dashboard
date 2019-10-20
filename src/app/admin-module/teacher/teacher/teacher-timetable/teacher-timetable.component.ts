import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { BASE_URL } from 'app/app.component';
import { TeacherService } from 'app/services/teacher.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-teacher-timetable',
  templateUrl: './teacher-timetable.component.html',
  styleUrls: ['./teacher-timetable.component.scss']
})
export class TeacherTimetableComponent implements OnInit {


  @Input('teacher') teacher: Teacher;

  @Output() modifiedTeacher = new EventEmitter<Teacher>();

  BASE_URL = BASE_URL;
  response;

  selectedFile: File
  isUploading = false;

  constructor(private teacherService: TeacherService, private translate: TranslateService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.isUploading = true;
    this.teacherService.uploadTimeTable(this.teacher.id, this.selectedFile)
    .then((teacher: Teacher) => {
        this.isUploading = false;
        this.teacher = teacher;
        this.teacher.timeTableUrl = `${teacher.timeTableUrl}?random+\=${Math.random()}`;
        this.modifiedTeacher.emit(this.teacher);
      })
    .catch(err => {
      alert('Emploi du temps upload est echoué' + err);
      this.isUploading = false;
    });
  }
}
