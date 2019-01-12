import { User, Gender } from './User';

export class Subject{

    id?: number;
    name?: string;
    description?: string;

    constructor(_id?:number, _name?: string, _description?: string ){
        this.id = _id;
        this.name = _name;
        this.description = _description;
    }
}