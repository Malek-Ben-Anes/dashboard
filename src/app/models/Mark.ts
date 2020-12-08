import { Lesson } from './Lesson';

export class Mark {

    id: string;
    observation: string;
    mark: number;
    studentId: string;
    lesson: Lesson;
    updatable: boolean;
    updatedAt: number| string;
    createdAt: number| string;

    constructor(studentId?: string, lesson?: Lesson, observation?: string, mark?: number) {
        this.studentId = studentId;
        this.lesson = lesson;
        this.observation = observation;
        this.mark = mark;
    }
}