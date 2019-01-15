import { User, Gender } from './User';

export class Teacher extends User {

    echelon: string;
    salary: number;

    constructor(_id?: number, _firstname?: string, _lastname?: string, _gender?: Gender,
        _echelon?: string, _salary?: number) {
        super(_id, _firstname, _lastname, _gender);
        this.echelon = _echelon;
        this.salary = _salary;
        this.role = ['pm'];
    }


}