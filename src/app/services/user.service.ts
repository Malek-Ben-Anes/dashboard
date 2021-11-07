import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_API_URL} from '@app/app.component';
import {CreatePasswordRequest} from '@app/models/password/CreatePasswordRequest.model';
import {UpdatePasswordRequest} from '@app/models/password/UpdatePasswordRequest.model';
import { Student } from '@app/models/Student.model';
import { Teacher } from '@app/models/Teacher.model';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly USER_URL: string = BASE_API_URL + 'users';

  readonly USERS_FILE_URL: string = BASE_API_URL + 'users/';

  constructor(private http: HttpClient, private fileService: FileUploadService) {}

  public uploadPhoto(user: Student | Teacher, file: File): Promise<any> {
    const PHOTO_UPLOAD_URL = `${this.USERS_FILE_URL}${user.id}/photo`;
    const body: FormData = new FormData();
    body.append('file', file);

    return this.fileService.executeCallForUrl(PHOTO_UPLOAD_URL, body);
  }

  createPassword(userId: string,
      createPassword: CreatePasswordRequest,
  ): Promise<any> {
    const url = `${this.USER_URL}/${userId}/password`;
    return this.http.post(url, createPassword, {responseType: 'blob'}).toPromise();
  }

  updatePassword(
      userId: string,
      updatePassword: UpdatePasswordRequest,
  ): Promise<any> {
    const url = `${this.USER_URL}/${userId}/password`;
    return this.http.put(url, updatePassword, {responseType: 'blob'}).toPromise();
  }
}
