import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Group} from '@app/models/Group.model';
import {BASE_API_URL} from '@app/app.component';
import {Student} from '@app/models/Student.model';
import {FileUploadService} from '../file-upload.service';
import { CreateGroupRequest } from '@app/models/requests/group/CreateGroup.model';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  readonly GROUP_URL: string = BASE_API_URL + 'groups';

  constructor(private http: HttpClient, private fileService: FileUploadService) {}

  findAll(teacherId?: string): Observable<Group[]> {
    if (teacherId != null) {
      const params = new HttpParams().set('teacherId', teacherId);
      return this.http.get<Group[]>(this.GROUP_URL, {params: params});
    }
    // .map((students) => students.sort((s1, s2) => s1.level.localeCompare(s2.level )));
    return this.http.get<Group[]>(this.GROUP_URL);
  }

  findById(groupId: string): Observable<Group> {
    return this.http.get<Group>(`${this.GROUP_URL}/${groupId}`);
  }

  create(createGroup: CreateGroupRequest): Observable<Group> {
    return this.http.post<Group>(this.GROUP_URL, createGroup);
  }

  update(group: Group): Promise<Group> {
    const URL = `${this.GROUP_URL}/${group.id}`;
    return new Promise((resolve, reject) => this.http.put<Group>(URL, group)
        .subscribe( (group) => resolve(group), (err) => reject(err)) );
  }

  deleteById(groupId: string): Promise<Group> {
    const URL = `${this.GROUP_URL}/${groupId}`;
    return new Promise((resolve, reject) => this.http.delete<Group>(URL)
        .subscribe((group) => resolve(group), (err) => reject(err)));
  }

  uploadTimeTable(groupId: string, file: File): Promise<Group> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `groups/${groupId}/timetables`;
    const body: FormData = new FormData();
    body.append('file', file);
    return this.fileService.executeCallForGroup(TIMETABLE_UPLOAD_URL, body);
  }

  addStudentsToGroup(groupId: string, students: Student[]): Promise<Student[]> {
    const URL = `${this.GROUP_URL}/${groupId}/students/`;
    return new Promise((resolve, reject) => this.http.post<Student[]>(URL, students)
        .subscribe( (students) => resolve(students), (err) => reject(err)) );
  }

  deleteStudentsFromGroup(groupId: string, students: Student[]): Promise<Student[]> {
    const URL = `${this.GROUP_URL}/${groupId}/students/`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), body: students,
    };
    return new Promise((resolve, reject) => this.http.delete<Student[]>(URL, httpOptions)
        .subscribe( (students) => resolve(students), (err) => reject(err)) );
  }
}
