import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from 'app/models/Student';
import { BASE_API_URL } from 'app/app.component';
import { Trimester } from 'app/models/Trimester';
import { Teacher } from 'app/models/Teacher';

const STUDENTS_URL: string = BASE_API_URL + 'students/';
const TEACHERS_URL: string = BASE_API_URL + 'teachers/';
const BULLETIN_URL: string = BASE_API_URL + 'bulletins/';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {}

  public uploadUserPhoto(user: Student | Teacher, file: File): Observable<HttpEvent<{}>> {
    let PHOTO_UPLOAD_URL = `${STUDENTS_URL}${user.id}/photos`;
    if (user.discriminatorValue === 'TEACHER') {
      PHOTO_UPLOAD_URL = `${TEACHERS_URL}${user.id}/photos`;
    }
    console.log(PHOTO_UPLOAD_URL);
    const body: FormData = new FormData();
    body.append('file', file);

    // const CROS_ORIGIN_KEY = ;
    console.log(body, file);

    return this.http.post<Student | Teacher>(PHOTO_UPLOAD_URL, body, {
      /*headers: {
                 'Access-Control-Allow-Origin': '*',
                 'Content-Type': 'multipart/form-data;  boundary=----WebKitFormBoundaryJ6Q2VG5TMUfGoSqg'
               },*/
      reportProgress: true,
      observe: 'events'
    });



  }

  public uploadBulletin(studentId: string, trimester: Trimester, file: File): Observable<HttpEvent<{}>> {
    const BULLETIN_UPLOAD_URL: string = BASE_API_URL + `students/${studentId}/bulletins`;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('trimester', trimester);

    return this.http.post<Student>(BULLETIN_UPLOAD_URL, formdata, {
      // headers: {'Content-Type': 'multipart/form-data; charset=utf-8'},
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteBulletin(bulletinId: string): Observable<any> {
    return this.http.delete(BULLETIN_URL + bulletinId);
  }


  /*

  fileData: File = null;
previewUrl:any = null;
fileUploadProgress: string = null;
uploadedFilePath: string = null;
constructor(private http: HttpClient) { }
 
fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
}
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/
      /*) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}
 
onSubmit() {
    const formData = new FormData();
      formData.append('file', this.fileData);
      this.http.post('url/to/your/api', formData)
        .subscribe(res => {
          console.log(res);
          this.uploadedFilePath = res.data.filePath;
          alert('SUCCESS !!');
        })
}
  */
}
