import {Level} from './enums/Level';

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

class Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
