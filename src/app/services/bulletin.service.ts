import { Injectable } from '@angular/core';
import { BASE_API_URL } from 'app/app.component';
import { Trimester } from 'app/models/Trimester';
import { Observable } from 'rxjs';
import { HttpEvent, HttpClient } from '@angular/common/http';
import { Student } from 'app/models/Student';



const BULLETIN_UPLOAD_URL: string = BASE_API_URL + 'bulletins/';

@Injectable({
  providedIn: 'root',
})
export class BulletinService {

  constructor(private http: HttpClient) { }

  uploadBulletin(studentId: number, trimester: Trimester, file: File): Observable<HttpEvent<{}>> {
    const BULLETIN_UPLOAD_URL: string = BASE_API_URL + `students/${studentId}/bulletins`;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('trimester', trimester);

    return this.http.post<Student>(BULLETIN_UPLOAD_URL, formdata, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteBulletin(bulletinId: number): Observable<any> {
    return this.http.delete(BULLETIN_UPLOAD_URL + bulletinId);
  }
}
