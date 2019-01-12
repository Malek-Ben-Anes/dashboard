import { User, Gender } from './User';
import { Student } from './Student';

export class Group{

    id?: number;
    name?: string;
    students?: Student[];

    constructor(_id?:number, _name?: string, _students?: Student[] ){
        this.id = _id;
        this.name = _name;
        this.students = [];
    }
}