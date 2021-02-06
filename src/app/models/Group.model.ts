import {Level} from './enums/Level';
import {Student} from './Student.model';

export class Group {
    id: string;
    name: string;
    level: Level;
    description?: string;
    timeTableUrl: string;
    studentsNumber: number;
    createdAt: Date;
    updatedAt: Date;
    students: Student[];
}
