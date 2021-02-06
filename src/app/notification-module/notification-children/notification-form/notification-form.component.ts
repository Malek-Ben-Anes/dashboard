import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import * as _ from 'lodash';

import {Teacher} from '@app/models/Teacher.model';
import {Group} from '@app/models/Group.model';
import {Student} from '@app/models/Student.model';
import {GroupService} from '@app/services/group.service';
import {StudentService} from '@app/services/student.service';
import {TeacherService} from '@app/services/teacher.service';
import {Notif} from '@app/models/enums/Notif';
import {Notification} from '@app/models/Notification';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {User} from '@app/models/User';
import {DialogContentExampleDialogComponent} from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import {Library} from '@app/models/enums/Library';
import {TranslateService} from '@ngx-translate/core';
import {DialogData} from '@app/models/DialogData';
import {DialogService} from '@app/commons/dialog/dialog.service';
import {BASE_URL} from '@app/app.component';
import { NotificationRequest } from '@app/models/requests/notification/CreateNotification.model';
import { TokenStorageService } from '@app/services/auth/token-storage.service';

@Component({
  selector: 'app-users-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
})
export class NotificationFormComponent implements OnInit {
  readonly BASE_URL: string = BASE_URL;
  private static Library: Library;
  @Input('notifications') notifications: Notification[];

  NOTIFS = Object.keys(Notif);
  selected: string = Library.TEACHER;
  notifForm: FormGroup;

  private _loggedUser: User;
  allTeachers: Teacher[];
  allGroups: Group[];
  StudentsOfSelectedGroup: Student[];
  selectedOptions: Teacher[] | Group[] | Student[];

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService,
              private dialogService: DialogService,
              private tokenStorage: TokenStorageService,
              private notificationService: NotificationService, private translate: TranslateService,
              private teacherService: TeacherService, private groupService: GroupService, private studentService: StudentService) { }

  ngOnInit() {
    this.initializeNotificationForm();
    this.findGroups();
    this.teacherService.findAll()
        .subscribe((teachers) => {
          this.allTeachers = teachers; this.selectedOptions = teachers; this.onToggleButton(Library.TEACHER);
        },
        (err) => console.log(err));
  }

  private async findGroups() {
    const roles: string[] = await this.tokenStorage.getAuthorities();
    const teacherId = await roles.includes('ROLE_TEACHER') ? this._loggedUser.id : undefined;
    console.log('teacherId', teacherId);
    this.groupService.findAll(teacherId).subscribe((groups) => this.allGroups = groups, (err) => console.log(err));
  }

  private async initializeNotificationForm() {
    await this.authService.getLoggedUser().then((loggedUser) => this._loggedUser = loggedUser);
    const loggedUserName = this._loggedUser ? `${this._loggedUser.firstName} ${ this._loggedUser.lastName}` : '';
    this.notifForm = this.formBuilder.group({
      notifier: [loggedUserName, Validators.required],
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(500)]],
      type: [null, Validators.required],
    });
  }

  openDialog(): void {
    const modalDialog: { dialogTitle: string; dialogMessage: string; } = this.computeModalDialog();
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '450px',
      height: '200px',
      data: {dialogTitle: modalDialog.dialogTitle, dialogMessage: modalDialog.dialogMessage},
    });
    dialogRef.afterClosed().subscribe((confirmtion) => {
      if (confirmtion) {
        this.onSubmitNotification();
      }
    });
  }

  private computeModalDialog(): {dialogTitle: string; dialogMessage: string;} {
    const selectedOptionNumber: number = this.selectedOptions.length;
    const seletedChoice: string = this.translate.instant('label.' + this.selected.toLowerCase());
    const dialogMessagePattern: string = this.translate.instant('All.text.notifications.confirmation.modal.message');
    const compiled = _.template(dialogMessagePattern);
    const dialogMessage: string = compiled({
      'selectedOptionNumber': selectedOptionNumber,
      'seletedChoice': seletedChoice,
    });
    const dialogTitle = this.translate.instant('All.text.notifications.confirmation.modal.title');
    return {dialogMessage: dialogMessage, dialogTitle: dialogTitle};
  }

  onSubmitNotification() {
    const request: NotificationRequest = this.prepareQuery();
    request.isNotifyGroup = this.selected === Library.GROUP;
    request.notifiedIds = _.map(this.selectedOptions, 'id');
    this.notificationService.save(request)
        .then((notification) => {
          const data: DialogData = {
            dialogTitle: this.translate.instant('All.text.notifications.modal.send.success.title'),
            dialogMessage: '',
          };
          this.dialogService.openDialog(data);
        })
        .catch((err) => {
          const data: DialogData = {
            dialogTitle: this.translate.instant('All.text.notifications.modal.send.fail.title'),
            dialogMessage: '',
          };
          this.dialogService.openDialog(data);
        });
  }

  public onToggleButton(choice: string): void {
    this.selected = choice;
    if (choice === Library.TEACHER) {
      this.selectedOptions = this.allTeachers;
    } else if (choice === Library.GROUP) {
      this.selectedOptions = this.allGroups;
    } else if (choice === Library.STUDENT) {
      this.selected = Library.STUDENT;
    }
  }

  onSelectGroup(groupSelected: Group) {
    if (this.selected = Library.STUDENT) {
      this.findStudentsByGroupId(groupSelected.id);
    }
  }

  onSelectCheckBox(e, selectedOptions): void {
    this.selectedOptions = _.map(selectedOptions.selected, (selectedOption) => selectedOption.value);
  }

  private findStudentsByGroupId(groupId: string) {
    this.studentService.findStudentsByGroupId(groupId)
        .subscribe((students) => {
          this.StudentsOfSelectedGroup = students;
          this.selectedOptions = students;
        }, (err) => console.log(err));
  }

  private prepareQuery(): NotificationRequest {
    return this.notificationService
        .buildNotificationRequest(this._loggedUser.id,
            undefined,
            this.extractFieldData('title'),
            this.extractFieldData('content'),
            this.extractFieldData('type'));
  }

  private extractFieldData(property: string): any {
    return this.notifForm.get(property).value;
  }
}
