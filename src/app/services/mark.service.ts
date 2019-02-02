import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { Mark } from 'app/models/Mark';



const MARK_URL: string = 'https://spring-boot-demo-app-cloud.cfapps.io/api/students/';


@Injectable({
  providedIn: 'root'
})
export class MarkService {

  studentId: number;
  

  subjects: Group[] = [];
  teachers: Group[] = [];

  constructor(private http: HttpClient) {}
  
  getStudentMarks(studentId: number): Observable<Mark[]> {
    console.log(MARK_URL);
    return this.http.get<Mark[]>(MARK_URL + studentId + '/marks/');
  }

  getMarkById(studentId: number, groupId: number): Observable<Mark> {
    return this.http.get<Mark>(MARK_URL + studentId + '/marks/' + groupId);
  }

  saveMark(mark: Mark) : Observable<Mark>  {
    return this.http.post<Mark>(MARK_URL + mark.student.id, mark);
  }

  deleteMark(studentId: number, groupId: number) {
    return this.http.delete(MARK_URL + studentId + '/marks/' + groupId);
  }
  /*
  
  saveGroup(studentId: number, mark: Mark) : Observable<Mark>  {
    return this.http.post<Mark>(MARK_URL, mark);
  }

  updateGroup(mark: Mark) : Observable<Mark>  {
    return this.http.put<Group>(MARK_URL  + '/' + group.id, group);
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
      }
    );
  }

  
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
