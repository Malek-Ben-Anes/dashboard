import { Gender } from "./enums/Gender";

export class User {

    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: Gender;
    photo?: string;
    birthDate?: Date;
    phone?: string;
    address?: string;
    createdAt?: string;
    updatedAt?: string;
    role: string[];
    discriminatorValue: string;
    newNotifications: number;

    constructor(_id: string, _firstname?: string, _lastName?: string, _gender?: Gender,
        _email?: string, _photo?: string, _birthDate?: Date, _phone?: string) {
        this.id = _id;
        this.firstName = _firstname;
        this.lastName = _lastName;
        this.email = _email;
        this.gender = _gender;
        this.photo = _photo;
        this.birthDate = _birthDate;
        this.phone = _phone;
        this.role;
    }
}

