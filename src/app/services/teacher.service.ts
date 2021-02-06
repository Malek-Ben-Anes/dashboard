import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Teacher} from '../models/Teacher.model';
import {HttpClient} from '@angular/common/http';
import {BASE_API_URL} from '@app/app.component';
import {FileUploadService} from './file-upload.service';
import {Student} from '@app/models/Student.model';
import {UpdateTeacherRequest} from '@app/models/requests/teacher/UpdateTeacher.model';
import {CreateTeacherRequest} from '@app/models/requests/teacher/CreateTeacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  readonly TEACHER_URL: string = BASE_API_URL + 'teachers';

  constructor(private fileService: FileUploadService, private http: HttpClient) { }

  findAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.TEACHER_URL);
  }

  getById(teacherId: string): Observable<Teacher> {
    return this.http.get<Teacher>(this.TEACHER_URL + '/' + teacherId);
  }

  create(teacherRequest: CreateTeacherRequest): Observable<Teacher> {
    return this.http.post<Teacher>(this.TEACHER_URL, teacherRequest);
  }

  patch(teacherId: string, teacherRequest: UpdateTeacherRequest): Observable<Teacher> {
    const Url = `${this.TEACHER_URL}/${teacherId}`;
    return this.http.patch<Teacher>(Url, teacherRequest);
  }

  update(teacherId: string, teacherRequest: UpdateTeacherRequest): Observable<Teacher> {
    const Url = `${this.TEACHER_URL}/${teacherId}`;
    return this.http.put<Teacher>(Url, teacherRequest);
  }

  updatePassword(teacherId: string, other:any): Observable<Teacher> {
    const Url = `${this.TEACHER_URL}/${teacherId}/password`;
    return this.http.put<Teacher>(Url, other); ;
  }

  uploadTimeTable(teacherId: string, file: File): Promise<Student | Teacher> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `teachers/${teacherId}/timetables`;
    const body: FormData = new FormData();
    body.append('file', file);
    return this.fileService.executeCall(TIMETABLE_UPLOAD_URL, body);
  }

  delete(teacherId: string): Observable<any> {
    const Url = `${this.TEACHER_URL}/${teacherId}`;
    return this.http.delete<any>(Url);
  }
}
