import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_API_URL} from '@app/app.component';
import {CreatePasswordRequest} from '@app/models/password/CreatePasswordRequest.model.ts';
import {UpdatePasswordRequest} from '@app/models/password/UpdatePasswordRequest.model.ts';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly USER_URL: string = BASE_API_URL + 'users';

  constructor(private http: HttpClient) {}

  createPassword(
      userId: string,
      createPassword: CreatePasswordRequest,
  ): Observable<any> {
    const url = `${this.USER_URL}/${userId}/password`;
    return this.http.post(url, createPassword, {responseType: 'blob'});
  }

  updatePassword(
      userId: string,
      updatePassword: UpdatePasswordRequest,
  ): Promise<any> {
    const url = `${this.USER_URL}/${userId}/password`;
    return this.http.put(url, updatePassword, {responseType: 'blob'}).toPromise();
  }
}
