import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/Teacher.model';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '@app/app.component';
import { FileUploadService } from './file-upload.service';
import { Student } from '@app/models/Student.model';


const TEACHER_URL: string = BASE_API_URL + 'teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private fileService: FileUploadService, private http: HttpClient) { }

  findAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(TEACHER_URL);
  }

  getById(teacherId: string): Observable<Teacher> {
    return this.http.get<Teacher>(TEACHER_URL + '/' + teacherId);
  }

  create(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(TEACHER_URL, teacher);
  }

  update(teacher: Teacher): Observable<Teacher> {
    const Url = `${TEACHER_URL}/${teacher.id}`;
    return this.http.put<Teacher>(Url, teacher);;
  }

  updatePassword(teacher: Teacher, other:any): Observable<Teacher> {
    const Url = `${TEACHER_URL}/${teacher.id}/password`;
    return this.http.put<Teacher>(Url, teacher);;
  }

  uploadTimeTable(teacherId: string, file: File): Promise<Student | Teacher> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `teachers/${teacherId}/timetables`;
    const body: FormData = new FormData();
    body.append('file', file);
    return this.fileService.executeCall(TIMETABLE_UPLOAD_URL, body);
  }

  delete(teacherId: string): Observable<any> {
    const Url = `${TEACHER_URL}/${teacherId}`;
    return this.http.delete<any>(Url);
  }

}