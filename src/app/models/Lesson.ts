import { User, Gender } from './User';
import { Level } from './Level';

export class Lesson{

    id?: LessonId;
    name?: string;
    level?: Level;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    subjectName: string;
    teacherName: string;
    groupName: string;


    constructor() {
        this.id = {};
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export class LessonId {
        teacherId?: string;
        subjectId?: string;
        groupId?: string;

        constructor(_teacherId?: string, _subjectId?: string, _groupId?: string) {
            this.teacherId = _teacherId;
            this.subjectId = _subjectId;
            this.groupId = _groupId;
        }
}
