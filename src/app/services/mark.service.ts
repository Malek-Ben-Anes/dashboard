import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { Mark } from 'app/models/Mark';
import { BASE_API_URL } from 'app/app.component';

const STUDENT_URL: string = BASE_API_URL + 'students/';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  studentId: string;

  subjects: Group[] = [];
  teachers: Group[] = [];

  constructor(private http: HttpClient) {}

  findAllByStudentId(studentId: string): Promise<Mark[]> {
    const MARK_URL = `${STUDENT_URL}${studentId}/marks/`;
    return new Promise((resolve, reject) => {
        this.http.get<Mark[]>(MARK_URL)
                 .subscribe(marks => resolve(marks), err => reject(err));
      });
  }

  save(studentId: string, marksRequest: Mark[]): Promise<Mark[]> {
    const MARK_URL = `${STUDENT_URL}${studentId}/marks/`;
    return new Promise((resolve, reject) => {
      this.http.post<Mark[]>(MARK_URL, marksRequest)
               .subscribe(marks => resolve(marks), err => reject(err));
    });
  }

  delete(studentId: string, markId: string): Promise<Mark> {
    const MARK_URL = `${STUDENT_URL}${studentId}/marks/${markId}`;
    return new Promise((resolve, reject) => {
      this.http.delete<Mark>(MARK_URL)
               .subscribe(mark => resolve(mark), err => reject(err));
    });
  }

  getStudentMarks(studentId: string): Observable<Mark[]> {
    const MARK_URL = `${STUDENT_URL}${studentId}/marks/`;
    return this.http.get<Mark[]>(MARK_URL);
  }

  getMarkById(studentId: string, groupId: string): Observable<Mark> {
    return this.http.get<Mark>(STUDENT_URL + studentId + '/marks/' + groupId);
  }

  saveMark(studentId: string, mark: Mark): Observable<Mark>  {
    return this.http.post<Mark>(STUDENT_URL + studentId + '/marks/', mark);
  }

  updateMark(mark: Mark) : Observable<Mark>  {
    return this.http.put<Mark>(STUDENT_URL + mark.student.id, mark);
  }

  deleteMark(studentId: string, groupId: string) {
    return this.http.delete(STUDENT_URL + studentId + '/marks/' + groupId);
  }
}