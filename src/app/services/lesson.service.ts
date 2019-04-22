import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
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
    const URL = `${LESSON_URL}/${id}`;
    return this.http.get<Lesson>(URL);
  }

  saveLesson(lesson: Lesson): Observable<Lesson>  {
    return this.http.post<Lesson>(LESSON_URL, lesson);
  }

  delete(lesson: Lesson): Observable<Lesson> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: lesson
    };
    return this.http.delete<Lesson>(LESSON_URL, httpOptions);
  }

  updateLesson(lesson: Lesson): Observable<Lesson>  {
    return this.http.put<Lesson>(LESSON_URL, lesson);
  }

  getLessonsByGroupId(groupId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(LESSON_URL);
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
      }
    );
  }

  findAll(teacherId?: string): Promise<Lesson[]> {
    return new Promise((resolve, reject) => {
      if (teacherId != null) {
        const params = new HttpParams().set('teacherId', teacherId);
        this.http.get<Lesson[]>(LESSON_URL, { params: params })
                 .subscribe(lessons => resolve(lessons), err => reject(err));
      } else {
        this.http.get<Lesson[]>(LESSON_URL)
                 .subscribe(lessons => resolve(lessons), err => reject(err));
      }
    });
  }

}
  /*
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: your body data
};

return new Promise(resolve => {
    this.httpClient.delete(URL, httpOptions)       
                   .subscribe(res => {     
                       resolve(res);
                   }, err => {               
                       resolve(err);
                   });
    });
  }
  */



