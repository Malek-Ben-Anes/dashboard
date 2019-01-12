import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { Gender } from 'app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherService } from 'app/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  teacher: Teacher ;

  teacherForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private teachersService: TeacherService,
    private router: Router, private route: ActivatedRoute) {
      console.log("***************user profile componenet");
     }

  ngOnInit() {

    this.initTeacher();
    console.log(this.teacher);

   /* let id = this.route.snapshot.params['id'];

    this.teachersService.getSingleTeacher(3).then(
      (teacher: Teacher) => {
        console.log(teacher);
        this.teacher = teacher;
        this.updateForm(this.teacher);
      }
    ).catch(err => { console.log(err); });
    this.initForm();*/
  }

  initTeacher() {
    this.teacher = new Teacher(12, "Alec", "Thompson", Gender.MALE, "high", 1200);
this.teacher.email = "saifeddine@plumedor.tn";
this.teacher.photo = "./assets/img/faces/marc.jpg";
this.teacher.birthDate = new Date();
this.teacher.phone = "saifeddine@plumedor.tn";

  }

  initForm() {
    this.teacherForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      birthDate: [new Date, Validators.required],
      gender: [Gender, Validators.required],
      salary: [Number, Validators.required],
      echelon: ['', Validators.required],
    });
  }
/*
  updateForm(teacher: Teacher): void {
    this.teacherForm.patchValue({
      firstname: teacher.firstname,
      lastname: teacher.lastname,
      email: teacher.email,
      birthDate: teacher.birthDate,
      gender: teacher.gender,
      salary: teacher.salary,
      echelon: teacher.echelon
    });
  }*/

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

  onUpdateTeacher() {
    this.teacher.firstname = this.teacherForm.get('firstname').value;
    this.teacher.lastname = this.teacherForm.get('lastname').value;
    this.teacher.email = this.teacherForm.get('email').value;
    this.teacher.birthDate = new Date(this.teacherForm.get('birthDate').value);
    this.teacher.gender = <Gender>Gender['MALE'];
    this.teacher.salary = this.teacherForm.get('salary').value;
    this.teacher.echelon = this.teacherForm.get('echelon').value;
    this.teachersService.updateTeacher(this.teacher);
  }

  onBack() {
    this.router.navigate(['table-list']);
  }
*/

}
