import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DataService {

  teacherForm: FormGroup;

  constructor() { }

  getFirstForGroup(): FormGroup {
    return this.teacherForm;
  }

  setFirstForGroup(_teacherForm: FormGroup): void {
    this.teacherForm = _teacherForm;
  }

  /*private messageSource = new BehaviorSubject("default message");
  currentMessage = this.messageSource.asObservable();

  

  changeMessage(message: string) {
    this.messageSource.next(message)
  }*/

}
