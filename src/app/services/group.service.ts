import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Group } from 'app/models/Group';

const GROUP_URL: string = 'https://infinite-sands-30212.herokuapp.com/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  
  subjects: Group[] = [];
  teachers: Group[] = [];

  constructor(private http: HttpClient) {}

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
