import { User, Gender } from './User';
import { Student } from './Student';
import { Lesson } from './Lesson';

export class Mark{

    id?: number;
    note?: number;
    mark?: string;
    student: Student;
    lesson: Lesson;
    constructor(){}
}