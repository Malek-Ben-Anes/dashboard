import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { Student } from '@app/models/Student.model';
import { BASE_URL } from '@app/app.component';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { AuthService } from '@app/services/auth/auth.service';
import { MarkService } from '@app/services/mark.service';
import { LessonService } from '@app/services/lesson.service';
import { Lesson } from '@app/models/Lesson';
import { Mark } from '@app/models/Mark';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mark-list',
  templateUrl: './mark-list.component.html',
  styleUrls: ['./mark-list.component.scss']
})
export class MarkListComponent implements OnInit {

  BASE_URL: string = BASE_URL;
  student: Student;

  // All lessons of the current group to be displayed in filter buttons.
  lessonsOfCurrentstudent: Lesson[] = [];

  // marks to be displayed after filtering action.
  marksToDisplay: Mark[];

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService,
              private translate: TranslateService,
              private markService: MarkService, private lessonService: LessonService) { }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.student = this.tokenStorage.getLoggedUser();
      this.getAllMarks(this.student.id);
    }
  }

  public onFilterByLesson(lesson: Lesson) {
    if (lesson == null) {
      this.marksToDisplay = this.student.marks;
    } else {
      this.marksToDisplay = this.markService.filterLessons(this.student.marks, lesson);
    }
  }

  private getAllMarks(studentId: string) {
    this.markService.findAll(studentId)
      .then(marks => { this.student.marks = marks
                       this.marksToDisplay = marks;
                       this.lessonsOfCurrentstudent = this.markService.extractLessonsFromMarks(marks);
                     })
      .catch(err => console.log(err));
  }

  public getMarkStyle(mark: number): string {
    const markColor: string = mark > 15 ? 'green'
                                        : mark >= 10 ? 'blue' : 'red';
    return `${markColor}-color`;
  }
}
