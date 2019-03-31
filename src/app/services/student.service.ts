import * as _ from "lodash";
import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Teacher } from "../models/Teacher";
import { Gender } from "../models/User";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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
  providedIn: "root"
})
export class StudentService {
  studentsSubject = new Subject<Student[]>();
  private students: Student[] = [];

  constructor(private http: HttpClient) {
    this.getSubjectsStudents();
  }

  emitStudentSubject() {
    this.studentsSubject.next(this.students.slice());
  }

  getSubjectsStudents() {
    return this.http.get<Student[]>(STUDENT_URL).subscribe(
      students => {
        this.students = students;
        this.emitStudentSubject();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }

  SearchForStudent(studentSearched: SearchStudent) {
    const studentsFound: Student[] = _.filter(this.students, studentSearched);
    this.studentsSubject.next(studentsFound);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(STUDENT_URL);
  }

  getGroupStudents(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(GROUP_URL + id + "/students/");
  }

  getSingleStudent(studentId: number): Student {
    return _.find(this.students, { id: +studentId });
  }

  /*refreshStudent(studentRequest: Student): Student {
    let studentInStudentsArray: Student = _.find(this.students, { id: studentRequest.id });
    studentInStudentsArray = studentRequest;
    this.emitStudentSubject();
    return studentInStudentsArray;
  }*/


  /*getSingleStudent(id: number): Observable<Student> {
    return this.http.get<Student>(STUDENT_URL + "/" + id);
  }*/

  saveStudent(studentRequest: Student) {
    this.http.post<Student>(STUDENT_URL, studentRequest).subscribe(
      student => {
        this.students.push(student);
        console.log("student created", student);
        this.emitStudentSubject();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }

  updateStudent(studentRequest: Student): Student {
    let result: Student = studentRequest;
    this.http
      .put<Student>(STUDENT_URL + '/' + studentRequest.id, studentRequest)
      .subscribe(
        (student: Student) => {
          let studentToUpdate =  _.find(this.students, { id: student.id }) ;
          studentToUpdate = student;
          console.log("student updated");
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(err.error);
            console.log("Client-side error occured.");
          } else {
            console.log(err.error);
            console.log("Server-side error occured.");
          }
        }
      );
      return result;
  }

  updateStudentPassword(studentRequest: Student): Observable<Student> {
    return this.http
      .put<Student>(STUDENT_URL + '/' + studentRequest.id, studentRequest);
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

  /*
  
  removeBook(book: Book) {
      if(book.photo) {
        const storageRef = firebase.storage().refFromURL(book.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const bookIndexToRemove = this.books.findIndex(
        (bookEl) => {
          if(bookEl === book) {
            return true;
          }
        }
      );
      this.books.splice(bookIndexToRemove, 1);
      this.saveBooks();
      this.emitBooks();
  }
  */
}
