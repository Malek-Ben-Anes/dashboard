import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpParams, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { group } from '@angular/animations';
import { BASE_API_URL } from 'app/app.component';
import { resolve, reject } from 'q';
import { Student } from 'app/models/Student';

const GROUP_URL: string = BASE_API_URL + 'groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  findAll(teacherId?: string): Observable<Group[]> {
    if (teacherId !== undefined) {
      const params = new HttpParams().set('teacherId', teacherId);
      return this.http.get<Group[]>(GROUP_URL, { params: params });
    } else {
      return this.http.get<Group[]>(GROUP_URL);
    }
  }

  find(groupId: string): Promise<Group> {
    const URL = `${GROUP_URL}/${groupId}`;
    return new Promise((resolve, reject) => this.http.get<Group>(URL)
              .subscribe( group =>  resolve(group), err => reject(err)));
  }

  save(group: Group): Promise<Group>  {
    return new Promise((resolve, reject) => this.http.post<Group>(GROUP_URL, group)
      .subscribe( group =>  resolve(group), err => reject(err)));
  }

  update(group: Group): Promise<Group>  {
    const URL = `${GROUP_URL}/${group.id}`;
    return new Promise((resolve, reject) => this.http.put<Group>(URL, group)
            .subscribe( group =>  resolve(group), err => reject(err)) );
  }

  uploadTimeTable(groupId: string, file: File): Observable<HttpEvent<{}>> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `groups/${groupId}/timetables`;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post<Group>(TIMETABLE_UPLOAD_URL, formdata, {
      reportProgress: true,
      observe: 'events'
    });
  }

  addStudentsToGroup(groupId: string, students: Student[]): Promise<Student[]>  {
    const URL = `${GROUP_URL}/${groupId}/students/`;
    return new Promise((resolve, reject) => this.http.post<Student[]>(URL, students)
            .subscribe( students =>  resolve(students), err => reject(err)) );
  }

  deleteStudentsFromGroup(groupId: string, students: Student[]): Promise<Student[]>  {
    const URL = `${GROUP_URL}/${groupId}/students/`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: students
    };
    return new Promise((resolve, reject) => this.http.delete<Student[]>(URL, httpOptions)
            .subscribe( students =>  resolve(students), err => reject(err)) );
  }



  /*uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
      }
    );
  }*/
}
