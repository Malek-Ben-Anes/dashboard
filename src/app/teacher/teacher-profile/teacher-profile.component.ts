import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { Gender } from 'app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from 'app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  teacher: Teacher;

  teacherForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private teachersService: TeacherService,
    private router: Router, private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.initForm();
    let id = this.route.snapshot.params['id'];
    
    if(id === undefined )
      this.teacher = new Teacher();

    this.teachersService.getSingleTeacher(id)
                        .subscribe(teacher => { this.teacher = teacher;
                        this.updateForm(this.teacher);
                       },
      (err: HttpErrorResponse) => {
        this.teacher = new Teacher();
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

  initForm() {
    this.teacherForm = this.formBuilder.group({
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



  updateForm(teacher: Teacher): void {
    this.teacherForm.patchValue({
      username: teacher.username,
      firstname: teacher.firstname,
      lastname: teacher.lastname,
      phone: teacher.phone,
      email: teacher.email,
      birthDate: teacher.birthDate,
      gender: <Gender>teacher.gender,
      adress: teacher.adress,
      description: teacher.echelon,
    });
    this.dataService.setFirstForGroup(this.teacherForm);
  }

  onSubmit() {
    this.getSubmitedData();
    console.log(this.teacher);
    if(this.teacher.id !== undefined ) {

    
      this.teachersService.updateTeacher(this.teacher)
                          .subscribe(teacher => { this.teacher = teacher; console.log("teacher updated")},
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
    this.teachersService.saveTeacher(this.teacher)
                        .subscribe(teacher => { this.teacher = teacher; console.log("teacher created")},
                          (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                          console.log("Client-side error occured.");
                          } else {
                          console.log("Server-side error occured.");
                          }
                          });
  }

  getSubmitedData() {
    this.teacher.username = this.teacherForm.get('username').value;
    this.teacher.name = this.teacherForm.get('username').value;
    this.teacher.firstname = this.teacherForm.get('firstname').value;
    this.teacher.lastname = this.teacherForm.get('lastname').value;
    this.teacher.phone = this.teacherForm.get('phone').value;
    this.teacher.email = this.teacherForm.get('email').value;
    this.teacher.birthDate = new Date(this.teacherForm.get('birthDate').value);
    this.teacher.gender = <Gender>Gender['MALE'];
    this.teacher.adress = this.teacherForm.get('adress').value;
    this.teacher.echelon = this.teacherForm.get('description').value;
    this.dataService.setFirstForGroup(this.teacherForm);
  }

  /*
  ngOnInit(): void {
    this.productForm = this.fb.group({
        productName: ['', [Validators.required,
                           Validators.minLength(3),
                           Validators.maxLength(50)]],
        productCode: ['', Validators.required],
        starRating: ['', stringValidators.range(1, 5)],
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
