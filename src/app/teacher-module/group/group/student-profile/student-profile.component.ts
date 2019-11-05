import { Component, OnInit } from '@angular/core';
import { Student } from 'app/models/Student';
import { BASE_URL } from 'app/app.component';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { StudentService } from 'app/services/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  BASE_URL: string = BASE_URL;

  studentForm: FormGroup;
  user: Student;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private studentService: StudentService,
              private route: ActivatedRoute, private translate: TranslateService) {
    
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id != null) {
      this.studentService.getStudentById(id).toPromise()
        .then(student => { this.user = student; console.log(this.user); this.initializeForm(this.user);})
        .catch(err => err);
    }
  }

  private initializeForm(student: Student): void {
    console.log(this.translate.instant('GLBL.' + student.gender));
    this.studentForm = this.formBuilder.group({
      firstname: [{value: student.firstname, disabled: true}],
      lastname: [{value: student.lastname, disabled: true}],
      email: [{value: student.email, disabled: true}],
      phone: [{value: student.phone, disabled: true}],
      gender: [{value: this.translate.instant('GLBL.' + student.gender), disabled: true}],
      birthDate: [{value: this.datePipe.transform(new Date(student.birthDate), 'dd / MM / yyyy') , disabled: true}],
      levelName: [{value: this.translate.instant(student.level), disabled: true}],
      groupName: [{value: student.group && student.group.name, disabled: true}],
      parentName: [{value: student.parentName, disabled: true}],
      parentPhone: [{value: student.parentPhone, disabled: true}],
      address: [{value: student.address, disabled: true}],
      description: [{value: student.description, disabled: true}],
    });
  }

  public getLevel(user: Student): string {
    return user.level ? 'GLBL.label.' + user.level : '';
  }
}
