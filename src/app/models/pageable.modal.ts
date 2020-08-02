import { User, Gender } from './User';
import { Level } from './Level';
import { Group } from './Group';
import { Mark } from './Mark';
import { Trimester } from './Trimester';

export class Pageable<T> {

    content: Array<T>;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    constructor() {
    }
}
