import { User, Gender } from './User';

export class Student extends User{

    echelon: string; 
	
    salary: number;
	
    //subjects = new HashSet<>();

    constructor(_id?:number, _firstname?: string, _lastname?: string, _gender?: Gender, 
                _echelon?: string, _salary?: number ){
        super(_id, _firstname, _lastname, _gender );
        this.echelon = _echelon;
        this.salary = _salary;
    }
}