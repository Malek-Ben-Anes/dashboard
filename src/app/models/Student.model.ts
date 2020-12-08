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
    marks?: Mark[]; // TODO remove marks

}
class Group {
    id: string;
    name: string;
    timeTableUrl: string;
}