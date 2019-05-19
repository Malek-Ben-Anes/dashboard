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

  constructor(private http: HttpClient) { }

  find(notifiedId: string): Promise<Notification[]> {
    const params = new HttpParams().set('notifiedId', notifiedId);
    return new Promise((resolve, reject) => this.http.get<Notification[]>(NOTIFICATION_URL, { params: params })
      .subscribe(notifications => resolve(notifications), err => reject(err)));
  }

  notifyUser(notificationRequest: Notification): Promise<Notification> {
    return new Promise((resolve, reject) => this.http.post<Notification>(NOTIFICATION_URL, notificationRequest)
      .subscribe(notification => resolve(notification), err => reject(err)));
  }

  notifyGroup(notificationRequest: Notification[], groupId?: string): Promise<Notification[]> {
    const GROUP_NOTIFICATION_URL = NOTIFICATION_URL + `${groupId}`;
    return new Promise((resolve, reject) => this.http.post<Notification[]>(GROUP_NOTIFICATION_URL, notificationRequest)
    .subscribe(notification => resolve(notification), err => reject(err)));
  }
}
