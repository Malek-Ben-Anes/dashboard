import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {Notification} from '@app/models/Notification';
import {BASE_API_URL} from '@app/app.component';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Notif} from '@app/models/enums/Notif';
import { NotificationRequest } from '@app/models/requests/notification/CreateNotification.model';
import { FileUploadService } from './file-upload.service';

const NOTIFICATION_URL: string = BASE_API_URL + 'notifications/';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient, private fileService: FileUploadService) { }

  findAll(notifiedId?: string, notifierId?: string, groupId?: string): Promise<Notification[]> {
    const params = this.buildHttpParams(notifiedId, notifierId, groupId);
    return new Promise((resolve, reject) => this.http.get<Notification[]>(NOTIFICATION_URL, {params: params})
        .subscribe((notifications) => {
          const sortedNotifications = _.sortBy(notifications, ['createdAt', 'updatedAt']).reverse();
          resolve(sortedNotifications);
        },
        (err) => reject(err)));
  }

  private buildHttpParams(notifiedId?: string, notifierId?: string, groupId?: string): HttpParams {
    if (notifiedId) {
      return new HttpParams().set('notifiedId', notifiedId);
    } else if (notifierId) {
      return new HttpParams().set('notifierId', notifierId);
    } else if (groupId) {
      return new HttpParams().set('groupId', groupId);
    }
  }

  save(request: NotificationRequest): Promise<Notification> {
    return this.http.post<Notification>(NOTIFICATION_URL, request).toPromise();
  }

  public uploadFile(notificationId: string, file: File): Promise<any> {
    const PHOTO_UPLOAD_URL = `${NOTIFICATION_URL}${notificationId}/fileUrl`;
    const body: FormData = new FormData();
    body.append('file', file);
    return this.fileService.executeCallForUrl(PHOTO_UPLOAD_URL, body);
  }

  delete(notificationId: String): Promise<any> {
    return this.http.delete<any>(NOTIFICATION_URL + notificationId).toPromise();
  }

  public buildNotificationRequest(notifierId: string, notifiedIds: string[], title: string, content: string, type: Notif): NotificationRequest {
    const request: NotificationRequest = new NotificationRequest();
    request.notifierId = notifierId;
    request.notifiedIds = notifiedIds;
    request.title = title;
    request.content = content;
    request.type = type as any;
    return request;
  }
}
