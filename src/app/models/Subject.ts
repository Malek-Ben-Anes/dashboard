import { User } from './User';
import { Gender } from "./enums/Gender";
import { Level } from './enums/Level';

export class Subject{

    id: string;
    name: string;
    level?: Level;
    coefficient?: string;
    hourlyVolume?: string;
    sessionNumber?: string;
    description?: string;

    constructor(){}
}