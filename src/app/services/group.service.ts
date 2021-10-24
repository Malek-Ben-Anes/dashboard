import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Group} from '@app/models/Group.model';
import {BASE_API_URL} from '@app/app.component';
import {FileUploadService} from './file-upload.service';
import {UpdateGroupRequest} from '@app/models/requests/group/UpdateGroup.model';
import {CreateGroupRequest} from '@app/models/requests/group/CreateGroup.model';
import {fromPromise} from 'rxjs/internal-compatibility';
import {PatchGroupStudentsRequest} from '@app/models/requests/group/PatchGroupStudents.model';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  readonly GROUP_URL: string = BASE_API_URL + 'groups';

  private group$ = new BehaviorSubject<Group>(null);

  constructor(private http: HttpClient, private fileService: FileUploadService) {}

  findById(groupId: string): Observable<Group> {
    return this.http.get<Group>(`${this.GROUP_URL}/${groupId}`).pipe(tap((group) => this.setGroup(group)));
  }

  getGroup(): Observable<Group> {
    return this.group$.asObservable();
  }

  setGroup(group: Group) {
    this.group$.next(group);
  }

  clearGroup() {
    this.group$.next(null);
  }

  create(group: CreateGroupRequest): Observable<Group> {
    return this.http.post<Group>(this.GROUP_URL, group).pipe(tap((group) => this.setGroup(group)));
  }

  update(group: UpdateGroupRequest): Observable<Group> {
    const URL = `${this.GROUP_URL}/${group.id}`;
    return this.http.put<Group>(URL, group).pipe(tap((group) => this.setGroup(group)));
  }

  deleteById(groupId: string): Observable<Group> {
    const URL = `${this.GROUP_URL}/${groupId}`;
    return this.http.delete<Group>(URL).pipe(tap(() => this.clearGroup()));
  }

  patchGroupStudents(groupId: string, updateStudents: PatchGroupStudentsRequest): Observable<any> {
    const URL = `${this.GROUP_URL}/${groupId}/students`;
    return this.http.patch<any>(URL, updateStudents);
  }

  uploadTimeTable(groupId: string, file: File): Observable<Group> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `groups/${groupId}/timetables`;
    const body: FormData = new FormData();
    body.append('file', file);
    return fromPromise(this.fileService.executeCallForGroup(TIMETABLE_UPLOAD_URL, body))
        .pipe(tap((group: Group) => {
          this.setGroup(group);
        }));
  }

  findAll(teacherId?: string): Promise<Group[]> {
    if (teacherId != null) {
      const params = new HttpParams().set('teacherId', teacherId);
      return this.http.get<Group[]>(this.GROUP_URL, {params: params}).toPromise();
    }
    // .map((students) => students.sort((s1, s2) => s1.level.localeCompare(s2.level )));
    return this.http.get<Group[]>(this.GROUP_URL).toPromise();
  }
}
