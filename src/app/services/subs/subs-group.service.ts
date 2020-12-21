import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Group} from '@app/models/Group.model';
import {BASE_API_URL} from '@app/app.component';
import {Student} from '@app/models/Student.model';
import {FileUploadService} from '../file-upload.service';
import {UpdateGroupRequest} from '@app/models/requests/group/UpdateGroup.model';
import {CreateGroupRequest} from '@app/models/requests/group/CreateGroup.model';
@Injectable({
  providedIn: 'root',
})
export class SubsGroupService {
  readonly GROUP_URL: string = BASE_API_URL + 'groups';

  private group$ = new Subject<Group>();

  constructor(private http: HttpClient, private fileService: FileUploadService) {}

  getGroup(): Observable<Group> {
    return this.group$.asObservable();
  }

  setGroup(group: Group) {
    this.group$.next(group);
  }

  getGroupById(groupId: string): Observable<Group> {
    return this.http.get<Group>(`${this.GROUP_URL}/${groupId}`).pipe(tap((group) => this.setGroup(group)));
  }

  clearGroup() {
    this.group$.next();
  }

  findById(groupId: string): Observable<Group> {
    return this.http.get<Group>(`${this.GROUP_URL}/${groupId}`).pipe(tap((group) => this.setGroup(group)));
  }

  create(group: CreateGroupRequest): Observable<Group> {
    return this.http.post<Group>(this.GROUP_URL, group).pipe(tap((group) => this.setGroup(group)));
  }

  update(group: UpdateGroupRequest): Observable<Group> {
    const URL = `${this.GROUP_URL}/${group.id}`;
    return this.http.put<Group>(URL, group).pipe(tap((group) => this.setGroup(group)));
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
