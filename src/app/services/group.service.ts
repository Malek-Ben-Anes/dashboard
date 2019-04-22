import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpParams, HttpEvent } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { group } from '@angular/animations';
import { BASE_API_URL } from 'app/app.component';

const GROUP_URL: string = BASE_API_URL + 'groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  
  private groups: Group[] = [];
  private teachers: Group[] = [];

  constructor(private http: HttpClient) {}

  findAll(teacherId?: string): Observable<Group[]> {

    if (teacherId !== undefined) {
      let params = new HttpParams().set('teacherId', teacherId);
      return this.http.get<Group[]>(GROUP_URL, { params: params });
    } else {
      return this.http.get<Group[]>(GROUP_URL);
    }
  }

  getSingleGroup(id: string): Observable<Group>  {
    return this.http.get<Group>(GROUP_URL + '/' + id);
  }

  saveGroup(group: Group) : Observable<Group>  {
    return this.http.post<Group>(GROUP_URL, group);
  }

  updateGroup(group: Group) : Observable<Group>  {
    return this.http.put<Group>(GROUP_URL  + '/' + group.id, group);
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

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
      }
    );
  }

  /*
  
  removeBook(book: Book) {
      if(book.photo) {
        const storageRef = firebase.storage().refFromURL(book.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const bookIndexToRemove = this.books.findIndex(
        (bookEl) => {
          if(bookEl === book) {
            return true;
          }
        }
      );
      this.books.splice(bookIndexToRemove, 1);
      this.saveBooks();
      this.emitBooks();
  }
  */


}
