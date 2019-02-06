import { User, Gender } from './User';
import { Student } from './Student';
import { Lesson } from './Lesson';

export class Mark{

    id?: number;
    note?: number;
    mark?: string;
    student: Student;
    lesson: Lesson;

    constructor(student?: Student, lesson?: Lesson, note?: number, mark?: string) {
        this.student = student;
        this.lesson = lesson;
        this.note = note;
        this.mark = mark;
    }
}