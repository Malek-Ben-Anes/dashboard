import * as _ from 'lodash';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Gender } from "@app/models/enums/Gender";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '@app/models/Student.model';
import { Level } from '@app/models/enums/Level';
import { Group } from '@app/models/Group.model';
import { GroupService } from '@app/services/http/group.service';
import { TranslateService } from '@ngx-translate/core';
import { StudentService } from '@app/services/student.service';
import { Router } from '@angular/router';
import { DialogContentExampleDialogComponent } from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { MatDialog } from '@angular/material';
import { CreateStudentRequest } from '@app/models/requests/student/CreateStudent.model';
import { UpdateStudentRequest } from '@app/models/requests/student/UpdateStudent.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  readonly EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  @Input('student')
  student: Student;

  @Input('isNew')
  isNew: boolean;

  @Output()
  studentRequest = new EventEmitter<CreateStudentRequest | UpdateStudentRequest>();

  genders = Object.keys(Gender);
  levels = Object.keys(Level);

  studentForm: FormGroup = this.initFormGroup();
  groups: Group[] = [];

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, public dialog: MatDialog, private router: Router,
              private studentService: StudentService, private translate: TranslateService) { }

  ngOnInit() {
    this.getGroup();
  }

  private getGroup() {
    this.groupService.findAll().subscribe(groups => {this.groups = groups; this.updateForm(this.student);
    }, err => console.log(err));
  }

  private initFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      lastName: ['', [Validators.required,  Validators.minLength(3), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]],
      birthDate: [null, Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      level: [null, Validators.required],
      group: [null],
      parentName: [''],
      parentPhone: [''],
      address: [''],
      description: ['', [Validators.minLength(6), Validators.maxLength(500)]],
    });
  }

  private updateForm(student: Student): void {
    this.studentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      phone: student.phone,
      email: student.email,
      gender: <Gender> student.gender,
      address: student.address,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      description: student.description,
    });

    if (!this.isNew) {
      this.studentForm.controls['email'].disable();
    }
    this.studentForm.get('birthDate').setValue(new Date(this.student.birthDate));
    const toSelect2 = this.levels.find(level => level === this.student.level);
    this.studentForm.get('level').setValue(toSelect2);
    if (this.student.group != null) {
      const toSelect1 = _.find(this.groups, (group) => group.id === this.student.group.id);
      this.studentForm.get('group').setValue(toSelect1);
    }
  }

  onSubmit() {
    this.studentRequest.emit(this.prepareRequest());
  }

  private prepareRequest(): CreateStudentRequest | UpdateStudentRequest {
    let request: CreateStudentRequest | UpdateStudentRequest = new UpdateStudentRequest();
    if(this.isNew) {
      request = new CreateStudentRequest();
      request.email = this.extractFieldData('email');
    }
    request.firstName = this.extractFieldData('firstName');
    request.lastName = this.extractFieldData('lastName');
    request.phone = this.extractFieldData('phone');
    request.birthDate = new Date(this.extractFieldData('birthDate'));
    request.gender = this.extractFieldData('gender');
    request.groupId = this.extractFieldData('group') ? this.extractFieldData('group').id : null;
    request.level = this.extractFieldData('level');
    request.address = this.extractFieldData('address');
    request.parentName = this.extractFieldData('parentName');
    request.parentPhone = this.extractFieldData('parentPhone');
    request.description = this.extractFieldData('description');
    return request;
  }

  private extractFieldData(property: string): any {
    return this.studentForm.get(property).value;
  }

  onConfirmationDelete(studentId: string ) {
    this.studentService.delete(studentId).subscribe(student => this.router.navigate(['app', 'students']));
  }

  onDelete(studentId: string): void {
    const modalDialog: { dialogTitle: string; dialogMessage: string; } =
    {
      dialogTitle: this.translate.instant('All.text.delete.title'),
      dialogMessage: this.translate.instant('All.text.delete.Confirmation')
    };
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '450px',
      height: '200px',
      data: { dialogTitle: modalDialog.dialogTitle, dialogMessage: modalDialog.dialogMessage }
    });
    dialogRef.afterClosed().subscribe(confirmtion => {
      if (confirmtion) {
        this.onConfirmationDelete(studentId);
      }
    });
  }

}
