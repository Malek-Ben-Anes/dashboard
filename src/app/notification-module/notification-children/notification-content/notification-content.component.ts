import {Component, Input, OnInit} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';
import {User} from '@app/models/User';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {Notification} from '@app/models/Notification';
import {environment} from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '@app/models/enums/Profile';
import { TranslateService } from '@ngx-translate/core';
import { DialogContentExampleDialogComponent } from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.css'],
})
export class NotificationContentComponent implements OnInit {
  @Input('isNotifReceived') isNotifReceived: boolean;
  @Input() notification: Notification;

  panelOpenState = false;

  BASE_URL = environment.resourceEndpoint;

  currentUser: User;

  constructor(private notificationService: NotificationService,
              private toast: ToastrService,
              private dialog: MatDialog,
              private translate: TranslateService) { }

  async ngOnInit() {

  }

  isAllowedToDelete(): boolean {
    // Notifier user and Admins are the unique profiles that are allowed to delete a notification.
    return !this.isNotifReceived || this.currentUser && this.currentUser.type === Profile.USER;
  }

  async onDelete(event, notificationId: string) {
    event.currentTarget.disabled = true;

    const modalDialog: { dialogTitle: string; dialogMessage: string; } =
    {
      dialogTitle: this.translate.instant('All.text.delete.title'),
      dialogMessage: this.translate.instant('All.text.delete.Confirmation'),
    };
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      width: '450px',
      height: '200px',
      data: {dialogTitle: modalDialog.dialogTitle, dialogMessage: modalDialog.dialogMessage},
    });
    dialogRef.afterClosed().subscribe(async (confirmtion) => {
      if (confirmtion) {
        try {
          await this.notificationService.delete(notificationId);
          this.toast.success(await this.translate.instant(`All.text.toast.SuccessDelete`), 'OK!');
        } catch (e) {
          this.toast.error(await this.translate.instant(`All.text.toast.failureDelete`), 'KO!');
        }
      }
    });
  }
}
