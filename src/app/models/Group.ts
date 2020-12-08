import { Student } from './Student.model';
import { Level } from './enums/Level';

export class Group {

    id: string;
    name: string;
    level: Level;
    description?: string;
    timeTableUrl: string;
    students: Student[];
    studentsNumber: number;

    constructor(_id?: string, _name?: string,_description?: string, _students?: Student[]) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.students = [];
    }
}
