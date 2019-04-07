import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { Mark } from 'app/models/Mark';
import { BASE_API_URL } from 'app/app.component';

const MARK_URL: string = BASE_API_URL + 'students/';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  studentId: string;
  

  subjects: Group[] = [];
  teachers: Group[] = [];

  constructor(private http: HttpClient) {}
  
  getStudentMarks(studentId: string): Observable<Mark[]> {
    console.log(MARK_URL + studentId + '/marks/');
    return this.http.get<Mark[]>(MARK_URL + studentId + '/marks/');
  }

  getMarkById(studentId: string, groupId: string): Observable<Mark> {
    return this.http.get<Mark>(MARK_URL + studentId + '/marks/' + groupId);
  }

  saveMark(studentId: string, mark: Mark) : Observable<Mark>  {
    return this.http.post<Mark>(MARK_URL+ studentId + '/marks/', mark);
  }

  updateMark(mark: Mark) : Observable<Mark>  {
    return this.http.put<Mark>(MARK_URL + mark.student.id, mark);
  }

  deleteMark(studentId: string, groupId: string) {
    return this.http.delete(MARK_URL + studentId + '/marks/' + groupId);
  }
  /*
  
  saveGroup(studentId: string, mark: Mark) : Observable<Mark>  {
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
