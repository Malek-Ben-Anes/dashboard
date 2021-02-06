import {Gender} from '@app/models/enums/Gender';
import {Profile} from './enums/Profile';
export class User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    gender: Gender;
    photo: string;
    birthDate: Date;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    newNotifications: number;
    type: Profile;

    constructor() {
    }
}

