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


    constructor(_id?:LessonId, _name?: string, _description?: string ){
        this.id = _id;
        this.name = _name;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export class LessonId {
        teacherId?: number;
        subjectId?: number;
        groupId?: number;

        constructor(_teacherId?: number, _subjectId?: number, _groupId?: number) {
            this.teacherId = _teacherId;
            this.subjectId = _subjectId;
            this.groupId = _groupId;
        }
}
