import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { Lesson } from 'app/models/Lesson';
import { BASE_API_URL } from 'app/app.component';

const LESSON_URL: string = BASE_API_URL + 'lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  
  subjects: Group[] = [];
  teachers: Group[] = [];

  constructor(private http: HttpClient) {}

  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(LESSON_URL);
  }

  getSingleLesson(id: string): Observable<Lesson>  {
    return this.http.get<Lesson>(LESSON_URL + '/' + id);
  }

  saveLesson(lesson: Lesson) : Observable<Lesson>  {
    return this.http.post<Lesson>(LESSON_URL, lesson);
  }

  updateLesson(lesson: Lesson) : Observable<Lesson>  {
    return this.http.put<Lesson>(LESSON_URL, lesson);
  }

  getLessonsByGroupId(groupId: string) : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(LESSON_URL);
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
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
