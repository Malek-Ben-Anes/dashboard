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
import { Notification, NotificationRequest } from 'app/models/Notification';
import { NotificationService } from 'app/services/notification.service';
import { AuthService } from 'app/services/auth/auth.service';
import { User } from 'app/models/User';
import { DialogContentExampleDialogComponent } from 'app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { Library } from 'app/models/Library';
import { TranslateService } from '@ngx-translate/core';
import { DialogData } from 'app/models/DialogData';
import { DialogService } from 'app/commons/dialog/dialog.service';

@Component({
  selector: 'app-users-notification-form',
  templateUrl: './users-notification-form.component.html',
  styleUrls: ['./users-notification-form.component.scss']
})
export class UsersNotificationFormComponent implements OnInit {

  public static Library: Library;

  @Input('loggedUser')
  loggedUser: User;

  NOTIFS = Object.keys(Notif);
  selected: string = Library.TEACHER;
  notifForm: FormGroup;

  allGroups: Group[];
  StudentsOfSelectedGroup: Student[];
  selectedOptions: Teacher[] | Group[] | Student[];

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder,
              private notificationService: NotificationService, private translate: TranslateService,
              private groupService: GroupService, private studentService: StudentService, private dialogService: DialogService) { }

  ngOnInit() {
    this.initializeNotificationForm();
    this.groupService.findAll(this.loggedUser.id)
                     .then(groups => this.allGroups = groups)
                     .then(groups => this.onToggleButton(Library.GROUP))
                     .catch(err => console.log(err));
  }

  private initializeNotificationForm() {
    const loggedUserName = this.loggedUser ?  `${this.loggedUser.firstname} ${ this.loggedUser.lastname}` : '';
    this.notifForm = this.formBuilder.group({
      notifier: [loggedUserName, Validators.required],
      //notified: [null, Validators.required],
      title: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)
      ]],
      type: [null, Validators.required],
    });
  }

  openDialog(): void {
    const modalDialog: { dialogTitle: string; dialogMessage: string; } = this.computeModalDialog();
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '450px',
      height: '200px',
      data: { dialogTitle: modalDialog.dialogTitle, dialogMessage: modalDialog.dialogMessage }
    });
    dialogRef.afterClosed().subscribe(confirmtion => {
      if (confirmtion) {
        this.onSubmitNotification();
      }
    });
  }

  private computeModalDialog():  {dialogTitle: string; dialogMessage: string;} {
    const selectedOptionNumber: number = this.selectedOptions.length;
    const seletedChoice: string = this.selected.toLowerCase();
    const dialogMessagePattern: string = this.translate.instant('All.text.notifications.confirmation.modal.message');
    const compiled = _.template(dialogMessagePattern);
    const dialogMessage: string = compiled({
                                            'selectedOptionNumber': selectedOptionNumber,
                                            'seletedChoice': seletedChoice
                                          });
    const dialogTitle = this.translate.instant('All.text.notifications.confirmation.modal.title');
    return {dialogMessage: dialogMessage, dialogTitle: dialogTitle};
  }

  onSubmitNotification() {
    const notifiedIds: string[] = _.map(this.selectedOptions, 'id');
    const notificationRequest: NotificationRequest = this.prepareQuery(notifiedIds);
    const notifyUser: boolean = (this.selected === Library.STUDENT) || (this.selected === Library.TEACHER);
    const notifyGroup: boolean = this.selected === Library.GROUP;
    this.notificationService.save(notificationRequest, notifyUser, notifyGroup)
            .then(notification => {console.log(notification);
              const data: DialogData = {
                dialogTitle: this.translate.instant('All.text.notifications.modal.send.success.title'),
                dialogMessage: ''
              };
              this.dialogService.openDialog(data);
            })
            .catch(err => {
              const data: DialogData = {
                dialogTitle: this.translate.instant('All.text.notifications.modal.send.fail.title'),
                dialogMessage: ''
              };
              this.dialogService.openDialog(data); });
  }

  private prepareQuery(notifiedIds: string[]): NotificationRequest {
    return this.notificationService
               .buildNotificationRequest(this.loggedUser.id,
                notifiedIds,
                this.extractFieldData('title'),
                this.extractFieldData('content'),
                this.extractFieldData('type'));
  }

  onToggleButton(choice: string): void {
    this.selected = choice;
    if (choice === Library.GROUP) {
      this.selectedOptions = this.allGroups;
    } else if (choice === Library.STUDENT) {
      this.selectedOptions = this.allGroups;
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
      this.selectedOptions = students;
      })
      .catch(err => console.log(err));
  }

  private extractFieldData(property: string): any {
    return this.notifForm.get(property).value;
  }
}
