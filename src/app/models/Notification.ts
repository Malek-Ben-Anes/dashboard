import {User} from '@app/models/User';
import {Notif} from './enums/Notif';

export class Notification {
    id: string;
    createdAt: string;
    updatedAt: string;
    notifier: User;
    notified: User;
    title: string;
    content: string;
    fileUrl: string;
    type: Notif;
}
