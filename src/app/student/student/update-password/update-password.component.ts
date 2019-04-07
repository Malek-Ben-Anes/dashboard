import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Student } from "app/models/Student";
import { StudentService } from "app/services/student.service";
import { BASE_URL } from "app/app.component";

@Component({
  selector: "app-update-password",
  templateUrl: "./update-password.component.html",
  styleUrls: ["./update-password.component.scss"]
})
export class UpdatePasswordComponent implements OnInit {

  @Input("student")
  student: Student;

  @Output()
  modifiedStudent = new EventEmitter<Student>();

  BASE_URL: string = BASE_URL;

  passwordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService) { }

  ngOnInit() {
    this.initForm();
    console.log(this.student);
    console.log(this.student.registerUrl);
  }

  get f() {
    return this.passwordForm.controls;
  }

  initForm() {
    this.passwordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]
        ],
        passwordConfirm: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50)
          ]
        ]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("passwordConfirm").value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.student.password = this.passwordForm.get("password").value;
    this.studentService
      .updateStudentPassword(this.student)
      .subscribe(
        (student) => {
        alert("password updated successfully!");
        this.student = student;
        this.modifiedStudent.emit(this.student);},
        err => console.log("password update failed!")
      );
  }
}
