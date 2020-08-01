import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { BASE_API_URL } from 'app/app.component';
import { Student } from 'app/models/Student';
import { FileUploadService } from './file-upload.service';
import { map } from 'rxjs/operators';

const GROUP_URL: string = BASE_API_URL + 'groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private fileService: FileUploadService) {}

  findAll(teacherId?: string): Observable<Group[]> {
    let httpCall: Observable<Group[]>;
    if (teacherId !== undefined) {
      const params = new HttpParams().set('teacherId', teacherId);
      httpCall = this.http.get<Group[]>(GROUP_URL, { params: params });
    } else {
      httpCall =  this.http.get<Group[]>(GROUP_URL);
    }
    return httpCall.pipe(map(students => students.sort((s1, s2) => s1.level.localeCompare(s2.level ))));
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
            .subscribe( group => resolve(group), err => reject(err)) );
  }

  uploadTimeTable(groupId: string, file: File): Promise<Group> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `groups/${groupId}/timetables`;
    const body: FormData = new FormData();
    body.append('file', file);
    return this.fileService.executeCallForGroup(TIMETABLE_UPLOAD_URL, body);
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
