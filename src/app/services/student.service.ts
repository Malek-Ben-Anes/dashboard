import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Teacher } from '../models/Teacher';
import { Gender } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { reject } from 'q';
import { Student } from 'app/models/Student';


//const url: string = 'http://localhost:8090/api/teachers';

const STUDENT_URL: string = 'https://spring-boot-demo-app-cloud.cfapps.io/api/students';
const GROUP_URL: string = 'https://spring-boot-demo-app-cloud.cfapps.io/api/groups/';

// const STUDENT_URL: string = 'http://localhost:8090/api/students';
// const GROUP_URL: string = 'http://localhost:8090/api/groups/';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  students: Student[] = [];

  constructor(private http: HttpClient) {}
  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(STUDENT_URL);
  }

  getGroupStudents(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(GROUP_URL + id + '/students/');
  }

  getSingleStudent(id: number): Observable<Student>  {
    return this.http.get<Student>(STUDENT_URL + '/' + id);
  }

  saveStudent(teacher: Student) : Observable<Student>  {
    return this.http.post<Student>(STUDENT_URL, teacher);
  }

  updateStudent(student: Student) : Observable<Student>  {
    return this.http.put<Student>(STUDENT_URL  + '/' + student.id, student);
  }




  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
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
      }
    );
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
