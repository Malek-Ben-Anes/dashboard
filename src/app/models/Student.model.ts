import {User} from './User';
import {Level} from './enums/Level';

export class Student extends User {
    level?: Level;
    group?: Group;
    parentName?: string;
    parentPhone?: string;
    description?: string;
    bulletins?: {};
}
class Group {
    id: string;
    name: string;
    timeTableUrl: string;
}
