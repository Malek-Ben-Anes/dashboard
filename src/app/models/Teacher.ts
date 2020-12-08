import { User } from '@app/models/User';
import { Gender } from "@app/models/enums/Gender";

export class Teacher extends User {

    description: string;
    salary: number;
    timeTableUrl: string;

    constructor(_id?: string, _firstname?: string, _lastname?: string, _gender?: Gender,
        _description?: string, _salary?: number) {
        super(_id, _firstname, _lastname, _gender);
        this.description = _description;
        this.salary = _salary;
    }
}