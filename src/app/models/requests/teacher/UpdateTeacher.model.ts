import { Gender } from "@app/models/enums/Gender";
import { Level } from '@app/models/enums/Level';

export class UpdateTeacherRequest {
    firstName: string;
    lastName: string;
    gender: Gender;
    photo: string;
    birthDate: Date;
    phone: string;
    address: string;
    description: string;
    timeTableUrl: string;
}