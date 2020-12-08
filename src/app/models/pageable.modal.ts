import { User } from './User';
import { Gender } from "./enums/Gender";
import { Level } from './enums/Level';
import { Group } from './Group';
import { Mark } from './Mark';
import { Trimester } from './enums/Trimester';

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
