import { User, Gender } from './User';
import { Student } from './Student';

export class Group{

    id?: number;
    name?: string;
    description?: string;
    students?: Student[];

    constructor(_id?:number, _name?: string,_description?: string, _students?: Student[] ){
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.students = [];
    }
}