import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'app/models/Group';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'app/services/teacher.service';
import { GroupService } from 'app/services/group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from 'app/models/Student';
import { StudentService } from 'app/services/student.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  group: Group = new Group();

  students: Student[];

  groupForm: FormGroup;
  groupStudentsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService,private studentService: StudentService,
    private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
      this.initGroupDetailForm();
      this.initStudentsForm();
      
      let id = this.route.snapshot.params['id'];
      
      if(id === undefined )
        this.group = new Group();
  
      this.groupService.getSingleGroup(id)
                          .subscribe(group => { this.group = group;
                            this.students = group.students;
                          this.updateForm(this.group);
                         },
        (err: HttpErrorResponse) => {
          this.group = new Group();
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });

        // this.studentService.getStudents()
        //                   .subscribe(students => { this.students = students;
                          
        //                  });
    }

    initGroupDetailForm() {
      this.groupForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

    initStudentsForm() {
      this.groupStudentsForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
      });
    }

    updateForm(group: Group): void {
      this.groupForm.patchValue({
        name: group.name,
        description: group.description,
        //studentsNumber: group.Number,
      });
    }

    onSubmit() {
      this.getSubmitedData();
      console.log(this.group);
      if(this.group.id !== undefined ) {
  
      
        this.groupService.updateGroup(this.group)
                            .subscribe(subject => { this.group = subject; console.log("subject updated")},
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
    }
  
    getSubmitedData() {
      this.group.name = this.groupForm.get('name').value;
      this.group.description = this.groupForm.get('description').value;  
      //this.group.students = this.gr
    }


    checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
}
