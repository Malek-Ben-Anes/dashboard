import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'app/models/Student';
import { BASE_API_URL } from 'app/app.component';
import { Trimester } from 'app/models/Trimester';
import { Teacher } from 'app/models/Teacher';
import { Group } from 'app/models/Group';

const USERS_URL: string = BASE_API_URL + 'users/';
const BULLETIN_URL: string = BASE_API_URL + 'bulletins/';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {}

  public uploadPhoto(user: Student | Teacher, file: File): Promise<Student | Teacher> {
    const PHOTO_UPLOAD_URL = `${USERS_URL}${user.id}/photo`;
    const body: FormData = new FormData();
    body.append('file', file);

    return this.executeCall(PHOTO_UPLOAD_URL, body);

}

public executeCall(url: string, body: FormData): Promise<Student | Teacher> {
  return new Promise((resolve, reject) =>
  {
    this.http.post<Student | Teacher>(url, body, this.prepareHeader())
    .subscribe(response => {
      if (response.type === 4 && response['body']) {
        const user: Student | Teacher = response['body'];
        resolve(user)
      }
    },
    err => reject(err));
    }
  );
}

public executeCallForGroup(url: string, body: FormData): Promise<Group> {
  return new Promise((resolve, reject) =>
  {
    this.http.post<Student | Teacher>(url, body, this.prepareHeader())
    .subscribe(response => {
      if (response.type === 4 && response['body']) {
        const group: Group = response['body'];
        resolve(group)
      }
    },
    err => reject(err));
    }
  );
}

public uploadBulletin(studentId: string, trimester: Trimester, file: File): Promise<Student> {
  const BULLETIN_UPLOAD_URL: string = BASE_API_URL + `students/${studentId}/bulletins`;
  const body: FormData = new FormData();
  body.append('file', file);
  body.append('trimester', trimester);

  return  this.executeCall(BULLETIN_UPLOAD_URL, body);
}

private prepareHeader(): any {
  const headers: any = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data; charset=utf-8'
  };
  return {headers: headers, reportProgress: true, observe: 'events'};
}

  public deleteBulletin(bulletinId: string): Observable<any> {
    return this.http.delete(BULLETIN_URL + bulletinId);
  }
}
