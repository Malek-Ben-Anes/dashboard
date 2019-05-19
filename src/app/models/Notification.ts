import { User, Gender } from './User';
import { Student } from './Student';
import { Level } from './Level';

export class Notification {

    id: string;
    notifier: User;
    notified: User;
    title?: string;
    content: string;
    type: Notif;

    constructor() {}
}

enum Notif {
    Notif1,
    Notif2,
    Notif3,
    Notif4,
    NotifN
}
