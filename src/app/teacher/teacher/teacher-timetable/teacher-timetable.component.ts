import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { BASE_URL } from 'app/app.component';
import { TeacherService } from 'app/services/teacher.service';
import { HttpResponse } from '@angular/common/http';

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

  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.teacherService.uploadTimeTable(this.teacher.id, this.selectedFile)
    .subscribe((response: HttpResponse<Teacher>) => {
      this.isUploading = true;
      if (response.type === 4) {
        this.isUploading = false;
        this.teacher.timetabeUrl = response.body.timetabeUrl + '?random+\=' + Math.random();
        this.modifiedTeacher.emit(this.teacher);
        console.log(this.teacher);
      }
    }, err => {
      alert('Emploi du temps upload est echoué');
      this.isUploading = false;
    });
  }
}
