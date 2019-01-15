import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { Gender } from 'app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from 'app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  student: Student;

  studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService,
    private router: Router, private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.initForm();
    let id = this.route.snapshot.params['id'];
    
    if(id === undefined )
      this.student = new Student();

    this.studentService.getSingleStudent(id)
                        .subscribe(student => { this.student = student;
                        this.updateForm(this.student);
                       },
      (err: HttpErrorResponse) => {
        this.student = new Teacher();
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      birthDate: [new Date, Validators.required],
      phone: ['', Validators.required],
      gender: [Gender, Validators.required],
      adress: ['', Validators.required],
      description: ['', Validators.required],
    });
    //this.dataService.setFirstForGroup(this.teacherForm);
  }



  updateForm(student: Teacher): void {
    this.studentForm.patchValue({
      username: student.username,
      firstname: student.firstname,
      lastname: student.lastname,
      phone: student.phone,
      email: student.email,
      birthDate: student.birthDate,
      gender: <Gender>student.gender,
      adress: student.adress,
      description: student.echelon,
    });
  }

  onSubmit() {
    this.getSubmitedData();
    console.log(this.student);
    if(this.student.id !== undefined ) {

    
      this.studentService.updateStudent(this.student)
                          .subscribe(student => { this.student = student; console.log("student updated")},
                    (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      console.log(err.error);
                    console.log("Client-side error occured.");
                    } else {
                      console.log(err.error);
                    console.log("Server-side error occured.");
                    }
                    });
                  }
    else 
    this.studentService.saveStudent(this.student)
                        .subscribe(student => { this.student = student; console.log("student created")},
                          (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                          console.log("Client-side error occured.");
                          } else {
                          console.log("Server-side error occured.");
                          }
                          });
  }

  getSubmitedData() {
    this.student.username = this.studentForm.get('username').value;
    this.student.name = this.studentForm.get('username').value;
    this.student.firstname = this.studentForm.get('firstname').value;
    this.student.lastname = this.studentForm.get('lastname').value;
    this.student.phone = this.studentForm.get('phone').value;
    this.student.email = this.studentForm.get('email').value;
    this.student.birthDate = new Date(this.studentForm.get('birthDate').value);
    this.student.gender = <Gender>Gender['MALE'];
    this.student.adress = this.studentForm.get('adress').value;
    this.student.echelon = this.studentForm.get('description').value;
  }

  /*
  ngOnInit(): void {
    this.productForm = this.fb.group({
        productName: ['', [Validators.required,
                           Validators.minLength(3),
                           Validators.maxLength(50)]],
        productCode: ['', Validators.required],
        starRating: ['', NumberValidators.range(1, 5)],
        description: ''
    });
}


  onBack() {
    this.router.navigate(['table-list']);
  }
*/


// initTeacher() {
//   this.teacher = new Teacher(12, "Alec", "Thompson", Gender.MALE, "high", 1200);
//   this.teacher.email = "saifeddine@plumedor.tn";
//   this.teacher.photo = "./assets/img/faces/marc.jpg";
//   this.teacher.birthDate = new Date();
//   this.teacher.phone = "saifeddine@plumedor.tn";

// }

}
