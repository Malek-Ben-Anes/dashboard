import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Student} from '@app/models/Student.model';
import {StudentService} from '@app/services/student.service';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CreateStudentRequest} from '@app/models/requests/student/CreateStudent.model';
import {UpdateStudentRequest} from '@app/models/requests/student/UpdateStudent.model';
import { Routers } from '@app/admin-module/routes/router-link';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  readonly STUDENT_PROFILE: string = Routers.APP_STUDENT_PROFILE;
  readonly tabIndex = {'PROFILE': 0, 'PASSWORD': 1, 'BULLETIN': 2, 'TIME_TABLE': 3};
  isNew = true;
  tabs = [];
  selected = new FormControl(0);
  student: Student;
  isLoading = false;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private toast: ToastrService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.tabs = this.refreshTabs();
    const id: string = this.route.snapshot.params['id'];
    if (id) {
      this.findStudent(id);
    } else {
      this.student = new Student();
      this.isNew = true;
    }
  }

  private async findStudent(id: string) {
    this.isLoading = true;
    try {
      this.student = await this.studentService.getById(id);
      this.isNew = false;
      this.tabs = this.refreshTabs();
    } finally {
      this.isLoading = false;
    }
  }

  refreshTabs() {
    return [
      {'label': 'All.tab.EditProfile', 'disabled': false},
      {'label': 'All.text.password', 'disabled': this.isNew},
      {'label': 'All.text.bulletins', 'disabled': this.isNew},
      {'label': 'All.text.timeTable.tab.name', 'disabled': this.isNew},
    ];
  }

  async onUpdate(request: CreateStudentRequest | UpdateStudentRequest) {
    if ( this.isNew ) {
      await this.create(<CreateStudentRequest>request);
    } else {
      await this.update(<UpdateStudentRequest>request);
    }
    this.tabs = this.refreshTabs();
  }

  refresh(updateStudent: Student) {
    this.student = updateStudent;
  }

  private async update(studentRequest: UpdateStudentRequest) {
    try {
      this.student = await this.studentService.update(this.student.id, studentRequest);
      this.toast.success('Profile update!', 'Profil eleve est mis à jour!');
    } catch {
      this.toast.error('Profile update!', 'Echec Profil eleve');
    }
  }

  private async create(studentRequest: CreateStudentRequest) {
    try {
      this.student = await this.studentService.create(studentRequest);
      this.toast.success('Hello world!', 'Toastr fun!');
      this.isNew = false;
    } catch {
      this.toast.error('Hello world!', await this.translate.instant('All.text.create.failed.duplicated'));
    }
  }
}
