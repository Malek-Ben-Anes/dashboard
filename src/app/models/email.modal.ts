import { User } from './User';
import { Gender } from "./enums/Gender";
import { Level } from './enums/Level';
import { Group } from './Group';
import { Mark } from './Mark';
import { Trimester } from './enums/Trimester';

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
