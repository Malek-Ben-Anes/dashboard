import { User, Gender } from './User';
import { Level } from './Level';
import { Group } from './Group';
import { Mark } from './Mark';
import { Trimester } from './Trimester';

export class Email {

    id: string;
    createdAt: Date;
    updatedAt: Date;
    senderName: string;
    senderEmail: string;
    message: string;

    constructor() {
    }
}
