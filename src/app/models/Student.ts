import { User, Gender } from './User';
import { Level } from './Level';
import { Group } from './Group';
import { Mark } from './Mark';

export class Student extends User {

    level?: Level;
    group?: Group;
    parentName?: string;
    parentPhone?: string;
    description: string;
    bulletins?: {};
    marks?: Mark[];

    constructor(_id?: string, _firstname?: string, _lastname?: string, _gender?: Gender,
        _description?: string, _marks?: Mark[]) {
        super(_id, _firstname, _lastname, _gender);
        this.marks = _marks;
    }
}