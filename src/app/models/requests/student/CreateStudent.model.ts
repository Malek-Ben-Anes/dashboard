import { Gender } from "@app/models/enums/Gender";
import { Level } from '@app/models/enums/Level';

export class createStudentRequest {
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
    photo: string;
    birthDate: Date;
    level: Level;
    groupId: string;
    phone: string;
    address: string;
    parentName?: string;
    parentPhone?: string;
    description?: string;
}