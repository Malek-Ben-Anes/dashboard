import { User } from './User';

export class Notification {
    id: string;
    notifier: User;
    notified: User;
    title?: string;
    content: string;
    type: Notif;

    constructor() {}
}

export class NotificationRequest {
    notifierId: string;
    notifiedIds: string[];
    title: string;
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


