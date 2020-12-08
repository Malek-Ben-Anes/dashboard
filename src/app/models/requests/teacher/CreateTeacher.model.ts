import { Gender } from "@app/models/enums/Gender";

export class CreateTeacherRequest {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    photo: string;
    birthDate: Date;
    phone: string;
    address: string;
    description: string;
    timeTableUrl: string;
}