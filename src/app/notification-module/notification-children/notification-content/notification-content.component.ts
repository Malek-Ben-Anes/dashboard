import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TeacherService} from '@app/services/teacher.service';

import {MatTableDataSource, MatPaginator} from '@angular/material';
import {User} from '@app/models/User';
import {NotificationService} from '@app/services/notification.service';
import {AuthService} from '@app/services/auth/auth.service';
import {Notification} from '@app/models/Notification';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-notification-content',
  templateUrl: './notification-content.component.html',
  styleUrls: ['./notification-content.component.css'],
})
export class NotificationContentComponent implements OnInit {
  @Input('isNotifReceived') isNotifReceived: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  errorMessage: string;

  BASE_URL = environment.resourceEndpoint;

  notifications: Notification[] = [];

  dataSource = new MatTableDataSource<Notification>();

  isLoading = false;
  currentUser: User;


  public array: any;

  public currentPage = 0;
  public totalSize = 0;

  pageIndex:number = 0;
  pageSize:number = 50;
  lowValue:number = 0;
  highValue:number = 50; 


  getPaginatorData(event) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
    } else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }

  constructor(private authService: AuthService, private notificationService: NotificationService, private teachersService: TeacherService) { }

  ngOnInit() {

    this.getArray();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private async getArray() {
    this.currentUser = await this.authService.getLoggedUser();
    const notifiedId = this.isNotifReceived ? this.currentUser.id : undefined;
    const notifierId = !this.isNotifReceived ? this.currentUser.id : undefined;
    await this.findNotifications(notifiedId, notifierId);
  }
  
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

  async findNotifications(notifiedId: string, notifierId: string) {
    this.isLoading = true;
    try {
      this.notifications = await this.notificationService.findAll(notifiedId, notifierId);

      this.dataSource.paginator = this.paginator;
      this.array = this.notifications;
      this.totalSize = this.array.length;
      this.iterator();


      /*this.refershPaginator();
      if (notifiedId) {
        setTimeout(() => {
          this.authService.saveNewNotifications(0);
        }, 1000);
      }*/
    } catch (error) {
      this.errorMessage = `${error.status}: ${error.error.message}`,
      this.isLoading = false;
    }
  }

  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Notification>(this.notifications);
    this.dataSource.paginator = this.paginator;
  }

  onDelete(event, notificationId: string) {
    event.currentTarget.disabled = true;
    this.notificationService.delete(notificationId).then().catch((err) => alert(err));
  }
}
