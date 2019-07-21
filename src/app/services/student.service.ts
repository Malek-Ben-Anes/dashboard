import * as _ from "lodash";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { Student } from "app/models/Student";
import { BASE_API_URL } from "../app.component";
import { Level } from "app/models/Level";
import { Group } from "app/models/Group";

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

  findAll(): Promise<Student[]> {
    return new Promise((resolve, reject) => this.http.get<Student[]>(STUDENT_URL)
    .subscribe(students => resolve(students), err => reject(err)));
  }

  findStudentsByGroupId(groupId: string): Promise<Student[]> {
    const URL = `${GROUP_URL}${groupId}/students/`;
    return new Promise((resolve, reject) => this.http.get<Student[]>(URL)
    .subscribe(students => resolve(students), err => reject(err)));
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

  update(student: Student, updatePassword?: boolean): Promise<Student> {
    const Url = `${STUDENT_URL}/${student.id}`
    return new Promise((resolve, reject) => {
      if (updatePassword != null) {
        const httpOptions = {
          params: new HttpParams().set('updatePassword', String(updatePassword))
        };
        this.http.put<Student>(Url, student, httpOptions)
        .subscribe(studentUpdated => resolve(studentUpdated), err => reject(err));
      } else {
        this.http.put<Student>(Url, student)
            .subscribe(studentUpdated => resolve(studentUpdated), err => reject(err));
      }
    });
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      /*const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );*/
    });
  }
}
