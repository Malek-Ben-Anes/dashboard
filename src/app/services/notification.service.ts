import { Injectable } from '@angular/core';
import { Notification } from 'app/models/Notification';
import { BASE_API_URL } from 'app/app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const NOTIFICATION_URL: string = BASE_API_URL + "notifications/";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  find(notifiedId: string): Promise<Notification[]> {
    const params = new HttpParams().set('notifiedId', notifiedId);
    return new Promise((resolve, reject) => this.http.get<Notification[]>(NOTIFICATION_URL, { params: params })
    .subscribe(notifications => resolve(notifications), err => reject(err)));
  }

  save(notificationRequest: Notification[], groupId?: string): Promise<Notification[]> {
    let httpCall: Observable<Notification[]>;
    
    // if groupId is not null then notify groups otherwise notify users
    if (groupId != null) {
      const params = new HttpParams().set('notifiedId', groupId);
      httpCall = this.http.post<Notification[]>(NOTIFICATION_URL, notificationRequest, { params: params });
    } else {
      httpCall = this.http.post<Notification[]>(NOTIFICATION_URL, notificationRequest);
    }
    return new Promise((resolve, reject) => httpCall.subscribe(notifications => resolve(notifications), err => reject(err)));
  }
}
