import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from 'app/models/Teacher';
import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { GroupService } from 'app/services/group.service';
import { StudentService } from 'app/services/student.service';
import { TeacherService } from 'app/services/teacher.service';
import { Notif } from 'app/models/Notif';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Notification } from 'app/models/Notification';
import { TokenStorageService } from 'app/auth/token-storage.service';
import { NotificationService } from 'app/services/notification.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-users-notification-form',
  templateUrl: './users-notification-form.component.html',
  styleUrls: ['./users-notification-form.component.scss']
})
export class UsersNotificationFormComponent implements OnInit {

  @Input('notifications') notifications: Notification[];

  NOTIFS = Object.keys(Notif);
  selected: string = 'TEACHER';
  notifForm: FormGroup;

  loggedUSerId: string;
  notification: Notification = new Notification();
  allTeachers: Teacher[];
  allGroups: Group[];
  StudentsOfSelectedGroup: Student[];

  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private authService: AuthService, private notificationService: NotificationService,
              private teacherService: TeacherService, private groupService: GroupService, private studentService: StudentService) { }

  ngOnInit() {
    this.initializeNotifForm();
    this.loggedUSerId = this.tokenStorage.getId();
    this.groupService.findAll().then(groups => this.allGroups = groups).catch(err => console.log(err));
    this.teacherService.findAll().then(teachers => this.allTeachers = teachers).catch(err => console.log(err));
  }
  
  onSubmit() {
    
    this.prepareQuery();
    console.log(this.notification);
      //   console.log(subject);
  //   this.newSubject = subject;
  //   this.updateForm(this.newSubject);
  }

  onToggleButton(choice: string) {
    if (choice === 'TEACHER') {
      this.selected = 'TEACHER';
    } else if (choice === 'GROUP') {
      this.selected = 'GROUP';
    } else {
      this.selected = 'STUDENT';
    }
  }
  
  private initializeNotifForm() {
    this.notifForm = this.formBuilder.group({
      notifier: [null, Validators.required],
      notified: [null, Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      type: [null, Validators.required],
    });
  }
  
  private prepareQuery() {
    // Extract data from Form Input fields
    this.notification.title = this.extractFieldData('title');
    this.notification.content = this.extractFieldData('content');
    this.notification.type = this.extractFieldData('type');

    // Complete the notification object fields
    this.notification.notifier = this.authService.getLoggedUser();
    this.notification.notified = this.authService.getLoggedUser();
  }

  private extractFieldData(property: string): any {
    return this.notifForm.get(property).value;
  }

}
