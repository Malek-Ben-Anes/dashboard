import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Teacher } from '../models/Teacher';
import { Gender } from '../models/User';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { reject } from 'q';
import { BASE_API_URL } from 'app/app.component';


const TEACHER_URL: string = BASE_API_URL + 'teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {}

  findAll(): Promise<Teacher[]> {
    return new Promise((resolve, reject) => this.http.get<Teacher[]>(TEACHER_URL)
          .subscribe( group =>  resolve(group), err => reject(err)));
  }

  findTeacherById(id: string): Observable<Teacher>  {
    return this.http.get<Teacher>(TEACHER_URL + '/' + id);
  }

  saveTeacher(teacher: Teacher): Observable<Teacher>  {
    return this.http.post<Teacher>(TEACHER_URL, teacher);
  }

  updatePassword(studentRequest: Teacher): Observable<Teacher> {
    return this.http
      .put<Teacher>(TEACHER_URL + '/' + studentRequest.id, studentRequest);
  }

  uploadTimeTable(teacherId: string, file: File): Observable<HttpEvent<{}>> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `teachers/${teacherId}/timetables`;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post<Teacher>(TIMETABLE_UPLOAD_URL, formdata, {
      reportProgress: true,
      observe: 'events'
    });
  }
    /*return new Promise((resolve, reject) => {
        let singleTeacher = this.teachers.find((el) => {
            return el.id == id
        })
        if (singleTeacher )
          resolve(singleTeacher);
        else 
          reject("can't find this teacher");
      })
      let SingleTeacher: Teacher = new Teacher();
      this.http.get<Teacher>(url + '/' + id).subscribe( teacher => { 
        SingleTeacher = teacher;
        resolve(SingleTeacher); }*/


  updateTeacher(teacher: Teacher) : Observable<Teacher>  {
    return this.http.put<Teacher>(TEACHER_URL  + '/' + teacher.id, teacher);
  }

  removeTeacher(teacher: Teacher) {
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
