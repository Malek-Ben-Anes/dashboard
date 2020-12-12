import {Level} from '@app/models/enums/Level';

export class Lesson {
    teacher: Teacher;
    subject: Subject;
    group: Group;
    createdAt?: Date;
    updatedAt?: Date;

    constructor() { }
}

class Teacher {
    id: string;
    name: string;
}

class Subject {
    id: string;
    name: string;
}
class Group {
    id: string;
    name: string;
    level: Level;
}
