import { Gender } from "@app/models/enums/Gender";
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

    constructor() {
    }
}

