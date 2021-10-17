import * as _ from 'lodash';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { Student } from '@app/models/Student.model';
import { BASE_API_URL } from '../app.component';
import { StudentFilter } from 'app/admin-module/student/student-list/student-filter/student-filter.component';
import { UpdateStudentRequest } from '@app/models/requests/student/UpdateStudent.model';
import { CreateStudentRequest } from '@app/models/requests/student/CreateStudent.model';
import { BaseCrudService } from './shared/base-crud/base-crud.service';
import { WebService } from './shared/web.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends BaseCrudService<Student, Student> {
  modelName = BASE_API_URL + 'students';
  readonly STUDENT_URL: string = BASE_API_URL + 'students';
  readonly GROUP_URL: string = BASE_API_URL + 'groups/';

  students: Student[] = [];

  constructor(injector: Injector, protected http: HttpClient, protected webService: WebService) {
    super(injector);
  }

  findAll(groupIsNull?: boolean): Promise<Student[]> {
    if (groupIsNull != null) {
      let params = new HttpParams();
      params = params.set('groupIsNull', String(groupIsNull));
      return this.webService.get<Student[]>(this.STUDENT_URL, { params: params });
    }
    return this.webService.get<Student[]>(this.STUDENT_URL);
  }

  findStudentsByGroupId(groupId: string): Promise<Student[]> {
    const URL = `${this.GROUP_URL}${groupId}/students/`;
    return this.webService.get<Student[]>(URL);
  }

  getById(studentId: string): Promise<Student> {
    return this.webService.get<Student>(this.STUDENT_URL + '/' + studentId);
  }

  findById(studentId: string): Promise<Student> {
    return this.webService.get<Student>(this.STUDENT_URL + '/' + studentId);
  }

  create(createRequest: CreateStudentRequest): Promise<Student> {
    return this.webService.post<Student>(this.STUDENT_URL, createRequest);
  }

  update(studentId: string, updateRequest: UpdateStudentRequest): Promise<Student> {
    const updateUrl = this.STUDENT_URL + '/' + studentId;
    return this.webService.put<Student>(updateUrl, updateRequest);
  }

  patch(studentId: string, updateRequest: UpdateStudentRequest): Observable<Student> {
    const updateUrl = this.STUDENT_URL + '/' + studentId;
    return this.http.patch<Student>(updateUrl, updateRequest);
  }

  getSingleStudent(studentId: string): Student {
    return _.find(this.students, { id: studentId });
  }

  delete(studentId: string): Promise<Student> {
    const Url = `${this.STUDENT_URL}/${studentId}`;
    return this.http.delete<Student>(Url).toPromise();
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
