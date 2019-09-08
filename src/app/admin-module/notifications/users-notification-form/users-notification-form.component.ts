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
import { Notif } from 'app/models/Notif';
import { Notification } from 'app/models/Notification';
import { NotificationService } from 'app/services/notification.service';
import { AuthService } from 'app/services/auth/auth.service';
import { User } from 'app/models/User';
import { DialogContentExampleDialogComponent } from 'app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { Library } from 'app/models/Library';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-notification-form',
  templateUrl: './users-notification-form.component.html',
  styleUrls: ['./users-notification-form.component.scss']
})
export class UsersNotificationFormComponent implements OnInit {

  @Input('notifications') notifications: Notification[];
  public static Library: Library;
  NOTIFS = Object.keys(Notif);
  selected: string = Library.TEACHER;
  notifForm: FormGroup;

  loggedUser: User;
  allTeachers: Teacher[];
  allGroups: Group[];
  StudentsOfSelectedGroup: Student[];
  selectedOptions: Teacher[] | Group[] | Student[];

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService,
              private notificationService: NotificationService, private translate: TranslateService,
    private teacherService: TeacherService, private groupService: GroupService, private studentService: StudentService) { }

  ngOnInit() {
    this.InitiateContext();
    this.groupService.findAll().then(groups => this.allGroups = groups).catch(err => console.log(err));
    this.teacherService.findAll().then(teachers => this.allTeachers = teachers)
      .then(teachers => this.onToggleButton(Library.TEACHER)).catch(err => console.log(err));
  }

  onConfirmNotification() {
    if (this.selected == Library.TEACHER || this.selected == Library.STUDENT) {
      _.map(this.selectedOptions, (selectedOption: Teacher | Student) => this.executeQuery(selectedOption));
    } else if (this.selected == Library.GROUP) {
      console.log(this.selectedOptions);
      _.map(this.selectedOptions, (selectedOption: Group) => this.executeQuerys(selectedOption));
    }
  }

  openDialog(): void {
    const selectedOptionNumber: number = this.selectedOptions.length;
    const seletedChoice: string = this.selected.toLowerCase();

    const dialogMessagePattern: string = this.translate.instant('admin.notifications.notify.confirmation.message');
    const compiled = _.template(dialogMessagePattern);
    const dialogMessage: string = compiled({'selectedOptionNumber': selectedOptionNumber,
                                            'seletedChoice': seletedChoice});

    const dialogTitle = this.translate.instant('admin.notifications.notify.validation.message');
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '450px',
      height: '200px',
      data: { dialogTitle: dialogTitle, dialogMessage: dialogMessage }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onConfirmNotification();
      }
    });
  }

  onToggleButton(choice: string): void {
    if (choice === Library.TEACHER) {
      this.selected = Library.TEACHER;
      this.selectedOptions = this.allTeachers;
      return;
    }
    if (choice === Library.GROUP) {
      this.selected = Library.GROUP;
      this.selectedOptions = this.allGroups;
      return;
    }
    if (choice === Library.STUDENT) {
      this.selected = Library.STUDENT;
      return;
    }
  }

  onSelectGroup(groupSelected: Group) {
    if (this.selected = Library.STUDENT) {
      this.findStudentsByGroupId(groupSelected.id);
      console.log(groupSelected);
    }
  }

  onSelectCheckBox(e, selectedOptions): void {
    this.selectedOptions = _.map(selectedOptions.selected, selectedOption => selectedOption.value);
  }

  private findStudentsByGroupId(groupId: string) {
    this.studentService.findStudentsByGroupId(groupId)
      .then(students => {
      this.StudentsOfSelectedGroup = students;
      })
      .catch(err => console.log(err));
  }

  private executeQuery(notified: Student | Teacher): void {
      const notification: Notification = this.prepareQuery(notified);
      this.notificationService.notifyUser(notification).then(notification => console.log(notification))
        .catch(err => console.log(err));
  }

  private executeQuerys(notified: Group): void {
      const notification: Notification = this.prepareQuerys();
      this.notificationService.notifyGroup(notification, notified.id).then(notification => console.log(notification))
        .catch(err => console.log(err));
  }

  private prepareQuery(notifiedUser?: User): Notification {
    const notification: Notification = new Notification();
    notification.title = this.extractFieldData('title');
    notification.content = this.extractFieldData('content');
    notification.type = this.extractFieldData('type');
    notification.notifier = this.loggedUser;
    notification.notified = notifiedUser;
    return notification;
  }

  private prepareQuerys(group?: Group): Notification {
    const notification: Notification = new Notification();
    notification.title = this.extractFieldData('title');
    notification.content = this.extractFieldData('content');
    notification.type = this.extractFieldData('type');
    notification.notifier = this.loggedUser;
    notification.notified = this.loggedUser;
    return notification;
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