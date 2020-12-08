import { Group } from './Group';
import { Trimester } from './enums/Trimester';

export class Bulletin {

    id: string;
    createdAt: Date;
    updatedAt: Date;
    fileUrl: Group;
    trimester: Trimester;

    constructor() {
    }
}
