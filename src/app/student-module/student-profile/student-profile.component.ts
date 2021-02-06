import {Component, OnInit} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import {User} from '@app/models/User';
import {Gender} from '@app/models/enums/Gender';
import {AuthService} from '@app/services/auth/auth.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BASE_URL} from '@app/app.component';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {StudentService} from '@app/services/student.service';
import {UpdateStudentRequest} from '@app/models/requests/student/UpdateStudent.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  BASE_URL: string = BASE_URL;

  form: FormGroup;
  isLogged = false;
  user: Student;

  constructor(private tokenStorage: TokenStorageService, private authService: AuthService, private formBuilder: FormBuilder,
    private studentService: StudentService, private datePipe: DatePipe, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      this.isLogged = true;
      this.user = this.tokenStorage.getLoggedUser();
      this.initForm(this.user);
    }
  }

  private initForm(student: Student): void {
    this.form = this.formBuilder.group({
      firstName: [{value: student.firstName, disabled: true}],
      lastName: [{value: student.lastName, disabled: true}],
      email: [{value: student.email, disabled: true}],
      gender: [{value: this.translate.instant('GLBL.' + student.gender), disabled: true}],
      levelName: [{value: this.translate.instant('GLBL.label.'+student.level), disabled: true}],
      groupName: [{value: student.group && student.group.name, disabled: true}],
      phone: [student.phone, Validators.required],
      birthDate: [new Date(student.birthDate), Validators.required],
      parentName: [student.parentName, Validators.required],
      parentPhone: [student.parentPhone, Validators.required],
      address: [student.address, Validators.required],
      description: [student.description, Validators.required],
    });
    this.form.get('birthDate').setValue(new Date(this.user.birthDate));
  }

  public getLevel(user: Student): string {
    return user.level ? 'GLBL.label.' + user.level : '';
  }

  onUpdate() {
    this.studentService.patch(this.user.id, this.prepareRequest()).subscribe((student) => {
      this.user = student;
      this.initForm(student);
      this.authService.saveLoggedUser(student);
    });
  }

  private prepareRequest(): UpdateStudentRequest {
    const request = new UpdateStudentRequest();
    request.birthDate = new Date(this.extractFieldData('birthDate'));
    request.phone = this.extractFieldData('phone');
    request.address = this.extractFieldData('address');
    request.parentName = this.extractFieldData('parentName');
    request.parentPhone = this.extractFieldData('parentPhone');
    request.description = this.extractFieldData('description');
    return request;
  }

  private extractFieldData(property: string): any {
    return this.form.get(property).value;
  }
}
