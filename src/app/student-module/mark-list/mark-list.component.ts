import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {BASE_URL} from '@app/app.component';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import {AuthService} from '@app/services/auth/auth.service';
import {MarkService} from '@app/services/mark.service';
import {LessonService} from '@app/services/lesson.service';
import {Lesson} from '@app/models/Lesson.model';
import {Mark} from '@app/models/Mark.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-mark-list',
  templateUrl: './mark-list.component.html',
  styleUrls: ['./mark-list.component.scss'],
})
export class MarkListComponent implements OnInit {
  BASE_URL: string = BASE_URL;
  student: Student;

  // All lessons of the current group to be displayed in filter buttons.
  lessonsOfCurrentstudent: Lesson[] = [];

  // marks to be displayed after filtering action.
  marks: Mark[];

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
    this.marks = this.markService.filterLessons(this.marks, lesson);
  }

  private getAllMarks(studentId: string) {
    this.markService.findAll(studentId)
        .subscribe((marks) => {
          this.marks = marks;
          this.lessonsOfCurrentstudent = this.markService.extractLessonsFromMarks(marks);
        });
  }

  public getMarkStyle(mark: number): string {
    const markColor: string = mark > 15 ? 'green' :
                                        mark >= 10 ? 'blue' : 'red';
    return `${markColor}-color`;
  }
}
