import { Group } from './Group';
import { Trimester } from './Trimester';

export class Bulletin {

    id: string;
    createdAt: Date;
    updatedAt: Date;
    fileUrl: Group;
    trimester: Trimester;

    constructor() {
    }
}
