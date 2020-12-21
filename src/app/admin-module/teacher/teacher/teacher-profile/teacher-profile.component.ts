import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from '@app/models/Teacher.model';
import { Gender } from "@app/models/enums/Gender";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '@app/services/teacher.service';
import { Router } from '@angular/router';
import { Level } from '@app/models/enums/Level';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DialogContentExampleDialogComponent } from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { UpdateTeacherRequest } from '@app/models/requests/teacher/UpdateTeacher.model';
import { CreateTeacherRequest } from '@app/models/requests/teacher/CreateTeacher.model';
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  @Input('teacher')
  teacher: Teacher;

  @Input('isNew')
  isNew: boolean;

  @Output()
  teacherRequest = new EventEmitter<CreateTeacherRequest | UpdateTeacherRequest>();

  genders = Object.keys(Gender);
  levels = Object.keys(Level);
  teacherForm: FormGroup = this.initForm();

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private teachersService: TeacherService, private router: Router, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.teacher == null) {
      this.teacher = new Teacher();
    }
    this.updateForm(this.teacher);
  }

  private initForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      birthDate: [new Date, Validators.required],
      phone: ['', Validators.required],
      gender: [Gender, Validators.required],
      address: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    });
  }

  private updateForm(teacher: Teacher): void {
    this.teacherForm.patchValue({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      phone: teacher.phone,
      email: teacher.email,
      birthDate: teacher.birthDate,
      gender: <Gender>teacher.gender,
      address: teacher.address,
      description: teacher.description,
    });
    this.teacherForm.get('birthDate').setValue(new Date(this.teacher.birthDate));
    if (!this.isNew) {
      this.teacherForm.controls['email'].disable();
    }
  }

  onSubmit() {
    this.teacherRequest.emit(this.prepareRequest());
  }

  private prepareRequest(): CreateTeacherRequest | UpdateTeacherRequest {
    const request: CreateTeacherRequest = new CreateTeacherRequest();
    request.firstName = this.extractFieldData('firstName');
    request.lastName = this.extractFieldData('lastName');
    request.phone = this.extractFieldData('phone');
    request.birthDate = new Date(this.extractFieldData('birthDate'));
    request.gender = this.extractFieldData('gender');
    request.address = this.extractFieldData('address');
    request.description = this.extractFieldData('description');
    request.email = this.extractFieldData('email');
    if(!this.isNew) {
      return <UpdateTeacherRequest> request;
    }
    return request;
  }

  private extractFieldData(property: string): any {
    return this.teacherForm.get(property).value;
  }

  onConfirmationDelete(teacherId: string) {
    this.teachersService.delete(teacherId).subscribe(teacher => {
      console.log("teacher deleted!");
      this.router.navigate(['app', 'teachers']);
    });
  }

  onDelete(teacherId: string): void {
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
        this.onConfirmationDelete(teacherId);
      }
    });
  }

}
