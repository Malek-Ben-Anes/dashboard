import {Notif} from '@app/models/enums/Notif';

export class NotificationRequest {
    notifierId: string;
    notifiedIds: string[];
    title: string;
    content: string;
    type: Notif;
    isNotifyGroup : boolean;
    file: any;
}
