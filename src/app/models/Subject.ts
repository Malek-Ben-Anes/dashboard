import { User, Gender } from './User';
import { Level } from './Level';

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