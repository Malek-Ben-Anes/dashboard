import { User } from './User';
import { Gender } from "./enums/Gender";
import { Level } from './enums/Level';
import { Mark } from './Mark';

export class Student extends User {
    level?: Level;
    group?: Group;
    parentName?: string;
    parentPhone?: string;
    description?: string;
    bulletins?: {};
    marks?: Mark[];

    constructor(_id?: string, _firstname?: string, _lastname?: string, _gender?: Gender,
        _description?: string, _marks?: Mark[]) {
        super(_id, _firstname, _lastname, _gender);
        this.marks = _marks;
    }

}
class Group {
    id: string;
    name: string;
}