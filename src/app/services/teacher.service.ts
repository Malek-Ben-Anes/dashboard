import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/Teacher.model';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '@app/app.component';
import { FileUploadService } from './file-upload.service';
import { Student } from '@app/models/Student.model';
import { UpdateTeacherRequest } from '@app/models/requests/teacher/UpdateTeacher.model';
import { CreateTeacherRequest } from '@app/models/requests/teacher/CreateTeacher.model';
import { BaseCrudService } from './shared/base-crud/base-crud.service';
import { WebService } from './shared/web.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService extends BaseCrudService<Teacher, Teacher> {
  readonly TEACHER_URL: string = BASE_API_URL + 'teachers';

  constructor(injector: Injector, protected http: HttpClient, protected webService: WebService, private fileService: FileUploadService) {
    super(injector);
  }

  findAll(): Promise<Teacher[]> {
    return this.webService.get<Teacher[]>(this.TEACHER_URL);
  }

  getById(teacherId: string): Promise<Teacher> {
    return this.webService.get<Teacher>(this.TEACHER_URL + '/' + teacherId);
  }

  create(teacherRequest: CreateTeacherRequest): Promise<Teacher> {
    return this.webService.post<Teacher>(this.TEACHER_URL, teacherRequest);
  }

  patch(teacherId: string, teacherRequest: UpdateTeacherRequest): Observable<Teacher> {
    const Url = `${this.TEACHER_URL}/${teacherId}`;
    return this.http.patch<Teacher>(Url, teacherRequest);
  }

  update(teacherId: string, teacherRequest: UpdateTeacherRequest): Promise<Teacher> {
    const Url = `${this.TEACHER_URL}/${teacherId}`;
    return this.webService.put<Teacher>(Url, teacherRequest);
  }

  updatePassword(teacherId: string, other: any): Promise<Teacher> {
    const Url = `${this.TEACHER_URL}/${teacherId}/password`;
    return this.webService.put<Teacher>(Url, other);;
  }

  uploadTimeTable(teacherId: string, file: File): Promise<Student | Teacher> {
    const TIMETABLE_UPLOAD_URL: string = BASE_API_URL + `teachers/${teacherId}/timetables`;
    const body: FormData = new FormData();
    body.append('file', file);
    return this.fileService.executeCall(TIMETABLE_UPLOAD_URL, body);
  }

  delete(teacherId: string): Promise<void> {
    const Url = `${this.TEACHER_URL}/${teacherId}`;
    return this.webService.delete<any>(Url);
  }
}
