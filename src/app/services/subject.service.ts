import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/Teacher';
import { Subject } from '../models/Subject';
import { Gender } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { reject } from 'q';
import { BASE_API_URL } from 'app/app.component';
import { Level } from 'app/models/Level';


const SUBJECT_URL: string = BASE_API_URL + 'subjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  subjects: Subject[] = [];
  teachers: Subject[] = [];

  constructor(private http: HttpClient) {}

  findAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(SUBJECT_URL);
  }

  findById(subjectId: string): Observable<Subject> {
    return this.http.get<Subject>(`${SUBJECT_URL}/${subjectId}`);
  }

  save(subject: Subject): Observable<Subject>  {
    return this.http.post<Subject>(SUBJECT_URL, subject);
  }

  update(subject: Subject): Observable<Subject>  {
    return this.http.put<Subject>(SUBJECT_URL  + '/' + subject.id, subject);
  }

  public filter(subjects: Subject[], level: Level): Subject[] {
    return  _.filter(subjects, subject => subject.level === level);
  }

}
