import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  @Input('student') student: Student;

  passwordForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService) {
  }

  ngOnInit() {

    this.initForm();
  }

  get f() { return this.passwordForm.controls; }

  initForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50)]],
      passwordConfirm: ['', [Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(50)]]},
        { validator: this.passwordMatchValidator}
        );
  }

private passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : {'mismatch': true};
 }



  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
  }

    this.student.password = this.passwordForm.get('password').value;
    this.studentService.updateStudent(this.student).subscribe(data => alert("password updated successfully!"), err => console.log('password update failed!'));
  }
}