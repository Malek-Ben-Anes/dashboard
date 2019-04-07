import { User, Gender } from './User';
import { Student } from './Student';
import { Lesson } from './Lesson';

export class Mark{

    id?: string;
    note?: string;
    mark?: string;
    student: Student;
    lesson: Lesson;

    constructor(student?: Student, lesson?: Lesson, note?: string, mark?: string) {
        this.student = student;
        this.lesson = lesson;
        this.note = note;
        this.mark = mark;
    }
}