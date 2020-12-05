import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Email } from '@app/models/email.modal';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '@app/app.component';
import { Pageable } from '@app/models/pageable.modal';

const EMAILS_URL: string = BASE_API_URL + 'emails/';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private http: HttpClient) { }

  findAll(page: number = 0): Promise<Pageable<Email>> {
    const params = new HttpParams().set('page', String(page));
    const httpCall: Observable<Pageable<Email>> = this.http.get<Pageable<Email>>(EMAILS_URL, { params: params });
    return new Promise((resolve, reject) => httpCall.subscribe( emailsPage =>  resolve(emailsPage), err => reject(err)));
  }

  delete(emailId: string): Promise<Email> {
    return new Promise((resolve, reject) => {
      this.http.delete<Email>(`${EMAILS_URL}${emailId}`)
               .subscribe(mark => resolve(mark), err => reject(err));
    });
  }

}
