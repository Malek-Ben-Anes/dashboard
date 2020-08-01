import * as _ from "lodash";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { Student } from "app/models/Student";
import { BASE_API_URL } from "../app.component";
import { Level } from "app/models/Level";
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

  saveStudent(teacher: Student): Observable<Student>  {
    return this.http.post<Student>(STUDENT_URL, teacher);
  }

  updateStudent(student: Student): Observable<Student>  {
    return this.http.put<Student>(STUDENT_URL  + '/' + student.id, student);
  }

  getSingleStudent(studentId: string): Student {
    return _.find(this.students, { id: studentId });
  }

  update(student: Student, updatePassword?: boolean): Observable<Student> {
    const Url = `${STUDENT_URL}/${student.id}`
    
      if (updatePassword != null) {
        const httpOptions = {
          params: new HttpParams().set('updatePassword', String(updatePassword))
        };
        return this.http.put<Student>(Url, student, httpOptions);
        
      } else {
        return this.http.put<Student>(Url, student);
        
      }
  }
  
  public filter(students: Student[], filter: StudentFilter): Student[] {
    return _.filter(students, student => this.predicate(student, filter));
  }

  private predicate(student: Student, filter: StudentFilter) {
    if (filter.groupId && student.group && (student.group.id != filter.groupId)) {
      return false;
    }
    if (filter.firstname && (student.firstname != filter.firstname)) {
      return false;
    }
    if (filter.lastname && (student.lastname != filter.lastname)) {
      return false;
    }
    if (filter.level  && (student.level != filter.level)) {
      return false;
    }
    return true;
  }

}
