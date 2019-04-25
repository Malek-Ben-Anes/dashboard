import { User, Gender } from './User';
import { Student } from './Student';
import { Level } from './Level';

export class Group {

    id: string;
    name: string;
    level: Level;
    description?: string;
    timetabeUrl: string;
    students: Student[];

    constructor(_id?: string, _name?: string,_description?: string, _students?: Student[]) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.students = [];
    }
}
