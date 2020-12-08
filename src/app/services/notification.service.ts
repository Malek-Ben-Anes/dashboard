import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Notification, NotificationRequest } from '@app/models/Notification';
import { BASE_API_URL } from '@app/app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Notif } from '@app/models/enums/Notif';

const NOTIFICATION_URL: string = BASE_API_URL + 'notifications/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  find(notifiedId: string, notifierId?: string, groupId?: string): Promise<Notification[]> {
    const params = new HttpParams().set('notifiedId', notifiedId);
    return new Promise((resolve, reject) => this.http.get<Notification[]>(NOTIFICATION_URL, { params: params })
      .subscribe(notifications => {
                                    const sortedNotifications = _.sortBy(notifications, ['createdAt', 'updatedAt']).reverse();
                                    resolve(sortedNotifications);
                                  },
                 err => reject(err)));
  }

  save(notificationRequest: NotificationRequest, notifyUser: boolean, notifyGroup: boolean): Promise<Notification> {
    const params: HttpParams = new HttpParams().set('notifyUser', String(notifyUser))
                                               .set('notifyGroup', String(notifyGroup));
    return new Promise((resolve, reject) =>
      this.http.post<Notification>(NOTIFICATION_URL, notificationRequest, {params: params})
      .subscribe(notification => resolve(notification), err => reject(err)));
  }

  public buildNotificationRequest(notifierId: string, notifiedIds: string[],
                                  title: string, content: string, type: Notif): NotificationRequest {
    const request: NotificationRequest = new NotificationRequest();
    request.notifierId = notifierId;
    request.notifiedIds = notifiedIds;
    request.title = title;
    request.content = content;
    request.type = type as any;
    return request;
  }
}
