import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'app/models/Student';
import { BASE_API_URL } from 'app/app.component';

const FILE_UPLOAD_URL: string = BASE_API_URL + 'profile/';
const BULLETIN_UPLOAD_URL: string = BASE_API_URL + 'bulletins/';


@Injectable()
export class FileUploadService {

  constructor(private http: HttpClient) { }


  uploadFile(userId, file:File): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();
    formdata.append('file', file);

    return this.http.post<Student>(FILE_UPLOAD_URL + userId + '/upload-picture', formdata, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadBulletin(studentId: number, trimester: string, file:File): Observable<HttpEvent<{}>> {

    const BULLETIN_UPLOAD_URL: string = BASE_API_URL + `students/${studentId}/bulletins`;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('trimester', 'TRIMESTER2');

    return this.http.post<Student>(BULLETIN_UPLOAD_URL, formdata, {
      reportProgress: true,
      observe: 'events'
    });
  }
  
  deleteBulletin(bulletinId: number): Observable<any> {
    return this.http.delete(BULLETIN_UPLOAD_URL + bulletinId);
  }
}

// pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
//   const formdata: FormData = new FormData();
//   formdata.append('file', file);
//   const req = new HttpRequest('POST', 'https://laplumedor.cfapps.io/api/profile/', formdata, {
//     reportProgress: true,
//     responseType: 'text'
//   }
//   );
//   return this.http.request(req);
// }
// selectedFile: ImageSnippet;

// private onSuccess() {
//   this.selectedFile.pending = false;
//   this.selectedFile.status = 'ok';
// }

// private onError() {
//   this.selectedFile.pending = false;
//   this.selectedFile.status = 'fail';
//   this.selectedFile.src = '';
// }

// processFile(imageInput: any) {
//   const file: File = imageInput.files[0];
//   const reader = new FileReader();

//   reader.addEventListener('load', (event: any) => {

//     this.selectedFile = new ImageSnippet(event.target.result, file);

//     this.selectedFile.pending = true;
//     this.imageService.uploadImage(this.selectedFile.file).subscribe(
//       (res) => {
//         this.onSuccess();
//       },
//       (err) => {
//         this.onError();
//       })
//   });

//   reader.readAsDataURL(file);
// }

