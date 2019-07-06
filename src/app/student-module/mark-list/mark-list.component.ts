import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { TokenStorageService } from 'app/services/auth/token-storage.service';
import { AuthService } from 'app/services/auth/auth.service';
import { MarkService } from 'app/services/mark.service';
import { LessonService } from 'app/services/lesson.service';
import { Lesson } from 'app/models/Lesson';
import { Mark } from 'app/models/Mark';

@Component({
  selector: 'app-mark-list',
  templateUrl: './mark-list.component.html',
  styleUrls: ['./mark-list.component.scss']
})
export class MarkListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  student: Student;

  // All lessons of the current group to be displayed in filter buttons.
  lessonsOfCurrentstudent: Lesson[];

  // marks to be displayed after filtering action.
  marksToDisplay: Mark[];

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService,
              private markService: MarkService, private lessonService: LessonService) { }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.student = this.tokenStorage.getLoggedUser();
      this.getAllMarksByStudentId(this.student.id);
    }
  }

  refresh(student: Student) {
    this.student = student;
    this.onFilterByLesson(null);
  }

  onFilterByLesson(lesson: Lesson) {
    if (lesson == null) {
      this.marksToDisplay = [...this.student.marks];
    } else {
      this.marksToDisplay = [... _.filter<Mark[]>(this.student.marks, mark => _.isEqual(mark.lesson, lesson))];
    }
  }

  onFilterLesson(marks: Mark[]) {
    if (!_.isEmpty(marks)) {
      this.lessonsOfCurrentstudent = _.chain(marks).map(mark => mark.lesson).uniqWith(_.isEqual).merge().value();
    } else {
      this.lessonsOfCurrentstudent = [];
    }
  }

  private getAllMarksByStudentId(studentId: string) {
    this.markService.findAllByStudentId(studentId)
      .then(marks => { this.student.marks = _.sortBy(marks, ['createdAt', 'updatedAt']).reverse()
            this.marksToDisplay = this.student.marks; this.onFilterLesson(this.student.marks); })
      .catch(err => console.log(err));
  }

  /*displayLessons(): string[] {
    return _.chain(this.lessonsOfCurrentGroup).map('subjectName').uniqBy().value();
  }*/
}
