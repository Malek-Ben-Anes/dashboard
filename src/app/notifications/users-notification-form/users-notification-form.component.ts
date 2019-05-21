import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';

import { Teacher } from 'app/models/Teacher';
import { Group } from 'app/models/Group';
import { Student } from 'app/models/Student';
import { GroupService } from 'app/services/group.service';
import { StudentService } from 'app/services/student.service';
import { TeacherService } from 'app/services/teacher.service';
import { NOTIF } from 'app/models/NOTIF';
import { Notification } from 'app/models/Notification';
import { NotificationService } from 'app/services/notification.service';
import { AuthService } from 'app/services/auth/auth.service';
import { User } from 'app/models/User';
import { DialogContentExampleDialogComponent } from 'app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
  selector: 'app-users-notification-form',
  templateUrl: './users-notification-form.component.html',
  styleUrls: ['./users-notification-form.component.scss']
})
export class UsersNotificationFormComponent implements OnInit {

  @Input('notifications') notifications: Notification[];

  NOTIFS = Object.keys(NOTIF);
  selected: string = 'TEACHER';
  notifForm: FormGroup;

  loggedUser: User;
  allTeachers: Teacher[];
  allGroups: Group[];
  allStudentsOfSelectedGroup: Student[];
  StudentsOfSelectedGroup: Student[];
  selectedOptions: Teacher[] | Group[] | Student[];

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService, private notificationService: NotificationService,
    private teacherService: TeacherService, private groupService: GroupService, private studentService: StudentService) { }

  ngOnInit() {
    this.InitiateContext();
    this.groupService.findAll().then(groups => this.allGroups = groups)
      .then(groups => this.onToggleButton('GROUP')).catch(err => console.log(err));
    this.teacherService.findAll().then(teachers => this.allTeachers = teachers)
      .then(teachers => this.onToggleButton('TEACHER')).catch(err => console.log(err));
  }

  onSubmit() {
    console.log('submit');
    if (this.selected == 'TEACHER') {
      _.map(this.selectedOptions, (selectedOption: Teacher) => this.executeQuery(selectedOption));
    } else if (this.selected == 'GROUP') {
      _.map(this.selectedOptions, (selectedOption: Group) => this.executeQuery(selectedOption));
    } 
  }

  /*openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  }*/

  openDialog() {
    this.dialog.open(DialogContentExampleDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  onToggleButton(choice: string) {
    if (choice === 'TEACHER') {
      this.selected = 'TEACHER';
      this.selectedOptions = this.allTeachers;
    } else if (choice === 'GROUP') {
      this.selected = 'GROUP';
      this.selectedOptions = this.allGroups;
    } else {
      this.selected = 'STUDENT';
      this.selectedOptions = this.allStudentsOfSelectedGroup;
    }
  }

  onSelection(e, selectedOptions): void {
    this.selectedOptions = _.map(selectedOptions.selected, selectedOption =>  selectedOption.value);
  }


  private executeQuery(notified: User | Group): void {
    if (notified instanceof User) {
      const notification: Notification = this.prepareQuery(notified);
      this.notificationService.notifyUser(notification).then(notification => console.log(notification))
      .catch(err  => console.log(err));
    } else if (notified instanceof Group) {
      const notifications: Notification[] = this.prepareQuerys(this.loggedUser);
      this.notificationService.notifyGroup(notifications, notified.id).then(notification => console.log(notification))
      .catch(err  => console.log(err));
    }
  }

  private prepareQuery(user: User): Notification {
    const notification: Notification = new Notification();
    // Extract data from Form Input fields
    notification.title = this.extractFieldData('title');
    notification.content = this.extractFieldData('content');
    notification.type = this.extractFieldData('type');
    // Complete the notification object fields
    notification.notifier = this.loggedUser;
    notification.notified = user;
    return notification;
  }

  private prepareQuerys(user: User): Notification[] {
    const notification: Notification = new Notification();
    // Extract data from Form Input fields
    notification.title = this.extractFieldData('title');
    notification.content = this.extractFieldData('content');
    notification.type = this.extractFieldData('type');
    // Complete the notification object fields
    notification.notifier = this.loggedUser;
    notification.notified = user;
    return [notification];
  }

  private extractFieldData(property: string): any {
    return this.notifForm.get(property).value;
  }

  private async InitiateContext() {
    await this.authService.getLoggedUser().then(loggedUser => this.loggedUser = loggedUser)
      .catch(err => console.log("retrieve user", err));
    this.initializeNotifForm();
  }

  private initializeNotifForm() {
    const loggedUserName = this.loggedUser ? this.loggedUser.firstname + ' ' + this.loggedUser.lastname : '';
    this.notifForm = this.formBuilder.group({
      notifier: [loggedUserName, Validators.required],
      notified: [null, Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      type: [null, Validators.required],
    });
  }
}