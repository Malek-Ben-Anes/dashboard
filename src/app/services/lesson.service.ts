import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Lesson} from '@app/models/Lesson.model';
import {BASE_API_URL} from '@app/app.component';
import {CreateLessonRequest} from '@app/models/requests/lesson/CreateLesson.model';
import {LessonIdRequest} from '@app/models/requests/lesson/LessonId.model';

const LESSON_URL: string = BASE_API_URL + 'lessons';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  lessons: Lesson[];

  constructor(private http: HttpClient) {}

  findAll(teacherId?: string, groupId?: string): Observable<Lesson[]> {
    if (teacherId != null || groupId != null) {
      const params = this.buildHttpParams(teacherId, groupId);
      return this.http.get<Lesson[]>(LESSON_URL, {params: params});
    }
    return this.http.get<Lesson[]>(LESSON_URL);
  }

  private buildHttpParams(teacherId?: string, groupId?: string): HttpParams {
    let result = new HttpParams();
    if (teacherId) {
      result = result.set('teacherId', teacherId);
    }
    if (groupId) {
      result = result.set('groupId', groupId);
    }

    return result;
  }

  create(request: CreateLessonRequest): Observable<Lesson> {
    return this.http.post<Lesson>(LESSON_URL, request);
  }

  delete(lesson: LessonIdRequest): Observable<Lesson> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), body: lesson,
    };
    return this.http.delete<Lesson>(LESSON_URL, httpOptions);
  }
}


