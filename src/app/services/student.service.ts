import * as _ from "lodash";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Student } from "@app/models/Student.model";
import { BASE_API_URL } from "../app.component";
import { Level } from "@app/models/enums/Level";
import { Group } from "app/models/Group";
import { StudentFilter } from "app/admin-module/student/student-list/student-filter/student-filter.component";
import { map } from "rxjs-compat/operator/map";

const STUDENT_URL: string = BASE_API_URL + "students";
const GROUP_URL: string = BASE_API_URL + "groups/";

interface SearchStudent {
  firstname: string;
  lastname: string;
  level: Level;
  group: Group;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[] = [];

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(STUDENT_URL);
  }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(STUDENT_URL);
  }

  findStudentsByGroupId(groupId: string): Observable<Student[]> {
    const URL = `${GROUP_URL}${groupId}/students/`;
    return this.http.get<Student[]>(URL);
  }

  getStudentById(id: string): Observable<Student>  {
    return this.http.get<Student>(STUDENT_URL + '/' + id);
  }

  save(student: Student): Promise<Student> {
    return new Promise((resolve, reject) => {
      this.http.post<Student>(STUDENT_URL, student)
          .subscribe(student => resolve(student), err => reject(err));
    });
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(STUDENT_URL  + '/' + student.id, student);
  }

  getSingleStudent(studentId: string): Student {
    return _.find(this.students, { id: studentId });
  }

  update(student: Student, updatePassword?: boolean): Observable<Student> {
    const Url = updatePassword ? `${STUDENT_URL}/${student.id}/password` : `${STUDENT_URL}/${student.id}`;
    return this.http.put<Student>(Url, student);
  }

  delete(studentId: string): Observable<Student> {
    const Url = `${STUDENT_URL}/${studentId}`;
    return this.http.delete<Student>(Url);
  }

  public filter(students: Student[], filter: StudentFilter): Student[] {
    return _.filter(students, student => this.predicate(student, filter));
  }

  private predicate(student: Student, filter: StudentFilter) {
    if (filter.groupId && student.group && (student.group.id != filter.groupId)) {
      return false;
    }
    if (filter.firstname && (student.firstName != filter.firstname)) {
      return false;
    }
    if (filter.lastname && (student.lastName != filter.lastname)) {
      return false;
    }
    if (filter.level  && (student.level != filter.level)) {
      return false;
    }
    return true;
  }

}
