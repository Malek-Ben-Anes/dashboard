import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Group } from 'app/models/Group';
import { group } from '@angular/animations';

const GROUP_URL: string = 'https://spring-boot-demo-app-cloud.cfapps.io/api/groups';
//const GROUP_URL: string = 'http://localhost:8090/api/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  
  private groups: Group[] = [];
  private teachers: Group[] = [];

  
  constructor(private http: HttpClient) {}
  
  // setGroup(groups: Group[]) {
  //   this.groups = groups;
  // }
  
  // getGroup(): Group[] {
  //   return this.groups;
  // }
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(GROUP_URL);
  }

  getSingleGroup(id: number): Observable<Group>  {
    return this.http.get<Group>(GROUP_URL + '/' + id);
  }

  saveGroup(group: Group) : Observable<Group>  {
    return this.http.post<Group>(GROUP_URL, group);
  }

  updateGroup(group: Group) : Observable<Group>  {
    return this.http.put<Group>(GROUP_URL  + '/' + group.id, group);
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
