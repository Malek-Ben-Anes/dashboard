import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Teacher } from '../models/Teacher';
import { Gender } from '../models/User';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { reject } from 'q';
import { BASE_API_URL } from 'app/app.component';
import { FileUploadService } from './file-upload.service';
import { Student } from 'app/models/Student';


const TEACHER_URL: string = BASE_API_URL + 'teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private fileService: FileUploadService, private http: HttpClient) { }

  findAll(): Promise<Teacher[]> {
    return new Promise((resolve, reject) => this.http.get<Teacher[]>(TEACHER_URL)
      .subscribe(group => resolve(group), err => reject(err)));
  }

  findTeacherById(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(TEACHER_URL + '/' + id);
  }

  saveTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(TEACHER_URL, teacher);
  }

  update(teacher: Teacher, updatePassword?: boolean): Promise<Teacher> {
    const Url = `${TEACHER_URL}/${teacher.id}`
    return new Promise((resolve, reject) => {
      if (updatePassword != null) {
        const httpOptions = {
          params: new HttpParams().set('updatePassword', String(updatePassword))
        };
        this.http.put<Teacher>(Url, teacher, httpOptions)
          .subscribe(studentUpdated => resolve(studentUpdated), err => reject(err));
      } else {
        this.http.put<Teacher>(Url, teacher)
          .subscribe(studentUpdated => resolve(studentUpdated), err => reject(err));
      }
    });
  }

  uploadTimeTable(teacherId: string, file: File): Promise<Student | Teacher> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `teachers/${teacherId}/timetables`;
    const body: FormData = new FormData();
    body.append('file', file);
    return this.fileService.executeCall(TIMETABLE_UPLOAD_URL, body);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(TEACHER_URL + '/' + teacher.id, teacher);
  }

  delete(teacherId: string): Observable<Teacher> {
    const Url = `${TEACHER_URL}/${teacherId}`;
    return this.http.delete<Teacher>(Url);
  }

}