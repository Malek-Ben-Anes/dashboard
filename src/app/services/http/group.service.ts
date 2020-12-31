import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Group} from '@app/models/Group.model';
import {BASE_API_URL} from '@app/app.component';
import {FileUploadService} from '../file-upload.service';
import {CreateGroupRequest} from '@app/models/requests/group/CreateGroup.model';
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
}
