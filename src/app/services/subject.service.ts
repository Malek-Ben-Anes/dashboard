import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/Teacher';
import { Subject } from '../models/Subject';
import { Gender } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { reject } from 'q';
import { BASE_API_URL } from 'app/app.component';
import { Level } from 'app/models/Level';


const SUBJECT_URL: string = BASE_API_URL + 'subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  subjects: Subject[] = [];
  teachers: Subject[] = [];

  constructor(private http: HttpClient) {}

  findAll(): Promise<Subject[]> {
    return new Promise((resolve, reject) => this.http.get<Subject[]>(SUBJECT_URL)
    .subscribe(subjects => resolve(subjects), err => reject(err)));
  }

  findById(subjectId: string): Promise<Subject> {
    return new Promise((resolve, reject) => this.http.get<Subject>(`${SUBJECT_URL}/${subjectId}`)
    .subscribe(subject => resolve(subject), err => reject(err)));
  }

  save(subject: Subject): Observable<Subject>  {
    return this.http.post<Subject>(SUBJECT_URL, subject);
  }

  update(subject: Subject): Observable<Subject>  {
    return this.http.put<Subject>(SUBJECT_URL  + '/' + subject.id, subject);
  }

  public filter(subjects: Subject[], level: Level): Subject[] {
    return  _.filter(subjects, subject => subject.level === level);
  }


  // createNewTeacher(newTeacher: Teacher) {
  //   this.teachers.push(newTeacher);
  //   this.saveTeacher(newTeacher);
  //   this.emitTeachers();
  // }

  // removeTeacher(teacher: Teacher) {
  //   const teacherIndexToRemove = this.teachers.findIndex(
  //     (teacherElement) => {
  //       if (teacherElement === teacher) {
  //         return true;
  //       }
  //     }
  //   );
  //   this.teachers.splice(teacherIndexToRemove, 1);
  //   //this.saveTeacher(newTeacher);
  //   this.emitTeachers();
  // }

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
