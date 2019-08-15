import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'app/models/Student';
import { BASE_API_URL } from 'app/app.component';
import { Trimester } from 'app/models/Trimester';
import { Teacher } from 'app/models/Teacher';

const STUDENTS_URL: string = BASE_API_URL + 'students/';
const TEACHERS_URL: string = BASE_API_URL + 'teachers/';

@Injectable({
  providedIn: "root"
})
export class FileUploadService {

  constructor(private http: HttpClient) {}

  uploadUserPhoto(user: Student| Teacher, file: File): Observable<HttpEvent<{}>> {
    let PHOTO_UPLOAD_URL = `${STUDENTS_URL}${user.id}/photos`;
    if (user.discriminatorValue === 'TEACHER') {
      PHOTO_UPLOAD_URL = `${TEACHERS_URL}${user.id}/photos`;
    }
    console.log(PHOTO_UPLOAD_URL);
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post<Student>(PHOTO_UPLOAD_URL, formdata, {
      headers: {'Content-Type': 'multipart/form-data; charset=utf-8'},
      reportProgress: true,
      observe: 'events'
    });
  }

}
