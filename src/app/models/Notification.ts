import {User} from '@app/models/User';
import {Notif} from './enums/Notif';

export class Notification {
    id: string;
    createdAt: string;
    updatedAt: string;
    notifierId: String;
    notified: User;
    title: string;
    content: string;
    type: Notif;
}
