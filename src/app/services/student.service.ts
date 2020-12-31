import * as _ from 'lodash';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Student} from '@app/models/Student.model';
import {BASE_API_URL} from '../app.component';
import {Level} from '@app/models/enums/Level';
import {Group} from '@app/models/Group.model';
import {StudentFilter} from 'app/admin-module/student/student-list/student-filter/student-filter.component';
import {UpdateStudentRequest} from '@app/models/requests/student/UpdateStudent.model';
import {CreateStudentRequest} from '@app/models/requests/student/CreateStudent.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  readonly STUDENT_URL: string = BASE_API_URL + 'students';
  readonly GROUP_URL: string = BASE_API_URL + 'groups/';

  students: Student[] = [];

  constructor(private http: HttpClient) {}

  findAll(groupIsNull?: boolean): Observable<Student[]> {
    if (groupIsNull != null) {
      let params = new HttpParams();
      params = params.set('groupIsNull', String(groupIsNull));
      return this.http.get<Student[]>(this.STUDENT_URL, {params: params});
    }
    return this.http.get<Student[]>(this.STUDENT_URL);
  }

  findStudentsByGroupId(groupId: string): Observable<Student[]> {
    const URL = `${this.GROUP_URL}${groupId}/students/`;
    return this.http.get<Student[]>(URL);
  }

  getById(studentId: string): Observable<Student> {
    return this.http.get<Student>(this.STUDENT_URL + '/' + studentId);
  }

  create(createRequest: CreateStudentRequest): Observable<Student> {
    return this.http.post<Student>(this.STUDENT_URL, createRequest);
  }

  update(studentId: string, updateRequest: UpdateStudentRequest): Observable<Student> {
    const updateUrl = this.STUDENT_URL + '/' + studentId;
    return this.http.put<Student>(updateUrl, updateRequest);
  }

  getSingleStudent(studentId: string): Student {
    return _.find(this.students, {id: studentId});
  }

  delete(studentId: string): Observable<Student> {
    const Url = `${this.STUDENT_URL}/${studentId}`;
    return this.http.delete<Student>(Url);
  }

  public filter(students: Student[], filter: StudentFilter): Student[] {
    return _.filter(students, (student) => this.predicate(student, filter));
  }

  private predicate(student: Student, filter: StudentFilter) {
    if (filter.groupId && student.group && (student.group.id != filter.groupId)) {
      return false;
    }
    if (filter.firstName && (student.firstName != filter.firstName)) {
      return false;
    }
    if (filter.lastName && (student.lastName != filter.lastName)) {
      return false;
    }
    if (filter.level && (student.level != filter.level)) {
      return false;
    }
    return true;
  }
}
