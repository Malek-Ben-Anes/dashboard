import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_API_URL} from '@app/app.component';
import {CreatePasswordRequest} from '@app/models/password/CreatePasswordRequest.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly USER_URL: string = BASE_API_URL + 'students';

  constructor(private http: HttpClient) { }

  updatePassword(userId: string, updatePassword: CreatePasswordRequest): Observable<any> {
    const url = `${this.USER_URL}/${userId}/password`;
    return this.http.put(url, updatePassword, {responseType: 'blob'});
  }
}
