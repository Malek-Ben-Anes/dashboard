import { User } from '@app/models/User';

export class Teacher extends User {
    description: string;
    timeTableUrl: string;
}