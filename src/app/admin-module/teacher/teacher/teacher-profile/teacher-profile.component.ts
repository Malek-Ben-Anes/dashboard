import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Teacher } from '@app/models/Teacher';
import { Gender } from '@app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from '@app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from '@app/models/Level';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DialogContentExampleDialogComponent } from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  @Input('teacher') teacher: Teacher;

  @Input('isNew') isNew: boolean;

  @Output() modifiedTeacher = new EventEmitter<Teacher>();

  genders = Object.keys(Gender);
  levels = Object.keys(Level);

  teacherForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private teachersService: TeacherService,
              private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.initForm();
    if ( this.teacher === undefined ) {
      this.teacher = new Teacher();
    }
    this.updateForm(this.teacher);
  }

  initForm() {
    this.teacherForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      birthDate: [new Date, Validators.required],
      phone: ['', Validators.required],
      gender: [Gender, Validators.required],
      address: ['', Validators.required],
      description: ['', [Validators.required,  Validators.minLength(3), Validators.maxLength(500)]],
    });
  }

  updateForm(teacher: Teacher): void {
    this.teacherForm.patchValue({
      firstname: teacher.firstName,
      lastname: teacher.lastName,
      phone: teacher.phone,
      email: teacher.email,
      birthDate: teacher.birthDate,
      gender: <Gender> teacher.gender,
      address: teacher.address,
      description: teacher.description,
    });
    this.teacherForm.get('birthDate').setValue(new Date(this.teacher.birthDate));
    if (!this.isNew) {
      this.teacherForm.controls['email'].disable();
    }
  }

  onSubmit() {
    this.extractFormData();
    this.modifiedTeacher.emit(this.teacher);
  }

  onConfirmationDelete(teacherId: string) {
    this.teachersService.delete(teacherId).subscribe(teacher =>
      { console.log("teacher deleted!");
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

  extractFormData() {
    this.teacher.firstName = this.extractFieldData('firstName');
    this.teacher.lastName = this.extractFieldData('lastName');
    this.teacher.email = this.extractFieldData('email');
    this.teacher.phone = this.extractFieldData('phone');
    this.teacher.birthDate = new Date(this.extractFieldData('birthDate'));
    this.teacher.gender = this.extractFieldData('gender');
    this.teacher.address = this.extractFieldData('address');
    this.teacher.description = this.extractFieldData('description');
  }

  private extractFieldData(property: string): any {
    return this.teacherForm.get(property).value;
  }
}
