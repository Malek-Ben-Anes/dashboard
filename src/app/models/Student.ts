import { User, Gender } from './User';
import { Level } from './Level';
import { Group } from './Group';

export class Student extends User {

    level?: Level;
    group?: Group;
    parentName?: string;
    parentPhone?:string;
    description: string;
    password?: string;
    bulletins?: {};

    //subjects = new HashSet<>();

    constructor(_id?: number, _firstname?: string, _lastname?: string, _gender?: Gender,
        _description?: string) {
        super(_id, _firstname, _lastname, _gender);
        this.description = _description;
    }
}