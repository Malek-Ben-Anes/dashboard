import { Component, OnInit } from '@angular/core';
import { Gender } from 'app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';
import { Level } from 'app/models/Level';
import { Group } from 'app/models/Group';
import { GroupService } from 'app/services/group.service';


const EMAIL_PATTERN = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  isNew: boolean = true;

  student: Student = new Student();

  studentForm: FormGroup;

  genders = Object.keys(Gender);
  levels = Object.keys(Level);

  groups: Group[] = [];

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private groupService: GroupService,
    private router: Router, private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {

    this.initForm();
    let id = this.route.snapshot.params['id'];

    if (id !== undefined) {
      console.log(id);
      this.getSingleStudent(id);
      
    } else {
      this.isNew = true;
    }
  }

  initForm() {
    this.groupService.getGroups().subscribe(groups => { this.groups = groups; console.log(this.groups); });
    this.studentForm = this.formBuilder.group({
      firstname: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      lastname: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      birthDate: [null, Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      level: [null, Validators.required],
      group: [null, Validators.required],
      parentName: ['', Validators.required],
      parentPhone: ['', Validators.required],
      adress: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  updateForm(student: Student): void {
    this.studentForm.patchValue({
      firstname: student.firstname,
      lastname: student.lastname,
      phone: student.phone,
      email: student.email,
      gender: <Gender>student.gender,
      adress: student.adress,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      description: student.description,
    });

    this.studentForm.get('birthDate').setValue(new Date(this.student.birthDate));
    const toSelect1 = this.groups.find(group => group.id == this.student.group.id);

    this.studentForm.get('group').setValue(toSelect1);

    const toSelect2 = this.levels.find(level => level == this.student.level);
    this.studentForm.get('level').setValue(toSelect2);
  }

  onSubmit() {
    this.extractFormData();
    console.log(this.student);
    if (this.student.id !== undefined) {
      this.updateStudent(this.student);
    }
    else {
      this.createStudent(this.student);
    }
  }

  private getSingleStudent(id): void {
    const student = this.studentService.getSingleStudent(id);
    if (student != null) {
      this.student = student;
      this.isNew = false;
      this.updateForm(this.student);
      console.log(this.student);
    }
  }

  private extractFormData(): void {
    this.student.firstname = this.extractFieldData('firstname');
    this.student.lastname = this.extractFieldData('lastname');
    this.student.name = this.student.firstname + ' ' + this.student.lastname;
    this.student.email = this.extractFieldData('email');
    this.student.username = this.student.email;
    this.student.phone = this.extractFieldData('phone');
    this.student.birthDate = new Date(this.extractFieldData('birthDate'));
    this.student.gender = this.extractFieldData('gender');
    this.student.group = this.extractFieldData('group');
    this.student.level = this.extractFieldData('level');
    this.student.adress = this.extractFieldData('adress');
    this.student.parentName = this.extractFieldData('parentName');
    this.student.parentPhone = this.extractFieldData('parentPhone');
    this.student.description = this.extractFieldData('description');
  }

  private extractFieldData(property: string): any {
    return this.studentForm.get(property).value;
  }

  private updateStudent(studentRequest: Student): void {
    this.student = this.studentService.updateStudent(studentRequest);
  }

  private createStudent(studentRequest: Student): void {
    this.studentService.saveStudent(studentRequest);
  }
  /*
  onBack() {
    this.router.navigate(['table-list']);
  }
*/
}
