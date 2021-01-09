import * as _ from 'lodash';
import {Injectable} from '@angular/core';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Mark} from '@app/models/Mark.model';
import {BASE_API_URL} from '@app/app.component';
import {Lesson} from '@app/models/Lesson.model';
import {Observable} from 'rxjs';

const STUDENT_URL: string = BASE_API_URL + 'students/';
const MARK_URL: string = BASE_API_URL + 'marks/';

@Injectable({
  providedIn: 'root',
})
export class MarkService {
  constructor(private http: HttpClient) {}

  findAll(studentId?: string, groupId?: string): Observable<Mark[]> {
    const params: HttpParams = this.buildHttpParams(studentId, groupId);
    return this.http.get<Mark[]>(MARK_URL, {params: params});
    /*
          .subscribe((marks) => {
            const sortedMarks = _.sortBy(marks, ['createdAt', 'updatedAt']).reverse();
            resolve(sortedMarks);
          }, (err) => reject(err));
    });*/
  }

  private buildHttpParams(studentId?: string, groupId?: string, subjectId?: string, teacherId?: string): HttpParams {
    if (studentId) {
      return new HttpParams().set('studentId', studentId);
    } else if (groupId) {
      return new HttpParams().set('groupId', groupId);
    } else if (subjectId) {
      return new HttpParams().set('subjectId', subjectId);
    } else if (teacherId) {
      return new HttpParams().set('teacherId', teacherId);
    }
  }

  save(studentId: string, marksRequest: Mark[]): Promise<Mark[]> {
    const MARK_URL = `${STUDENT_URL}${studentId}/marks/`;
    return new Promise((resolve, reject) => {
      this.http.post<Mark[]>(MARK_URL, marksRequest)
          .subscribe((marks) => resolve(marks), (err) => reject(err));
    });
  }

  delete(markId: string): Promise<Mark> {
    const MARKS_URL = `${MARK_URL}${markId}`;
    return new Promise((resolve, reject) => {
      this.http.delete<Mark>(MARKS_URL)
          .subscribe((mark) => resolve(mark), (err) => reject(err));
    });
  }

  public extractLessonsFromMarks(marks: Mark[]): Lesson[] {
    if (!_.isNil(marks) && !_.isEmpty(marks)) {
      return _.chain(marks)
          //.map((mark: Mark) => mark.lesson)
          .uniqBy('id.subjectId')
          .value();
    }
    return [];
  }

  public filterLessons(marks: Mark[], lesson: Lesson): Mark[] {
    if (!_.isNil(lesson) && !_.isNil(marks) && !_.isEmpty(marks)) {
      return _.filter<Mark[]>(marks, (mark) => _.isEqual(mark.lesson.id.subjectId, lesson.subject.id));
    }
    return [];
  }

  public filterMarks(marks: Mark[], studentId: string): Mark[] {
    if (!_.isNil(studentId) && !_.isNil(marks) && !_.isEmpty(marks)) {
      return _.filter<Mark[]>(marks, (mark) => _.isEqual(mark.studentId, studentId));
    }
    return [];
  }
}
