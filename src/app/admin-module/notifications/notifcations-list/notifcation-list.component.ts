import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Notification} from '@app/models/Notification';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '@app/services/auth/auth.service';
import {NotificationService} from '@app/services/notification.service';
import {User} from '@app/models/User';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-notifcation-list',
  templateUrl: './notifcation-list.component.html',
  styleUrls: ['./notifcation-list.component.scss'],
})
export class NotifcationListComponent implements OnInit, AfterViewInit {
  @Input('notifReceived') notifReceived: string;


  notifications: Notification[] = [];
  dataSource = new MatTableDataSource<Notification>([]);
  @ViewChild(MatPaginator, {read: true}) paginator: MatPaginator;

  
  sort;

  displayedColumns: string[] = ['Title', 'Content', 'Notifier', 'Date'];

  isLoading = false;
  currentUser: User;

  constructor(private translate: TranslateService, private authService: AuthService, private notificationService: NotificationService, private cdr: ChangeDetectorRef) {
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.authService.getLoggedUser().then((user) => this.currentUser = user);
    let findAllCall;
    if (this.notifReceived) {
      findAllCall = this.notificationService.findAll(this.currentUser.id);
    } else {
      findAllCall = this.notificationService.findAll(undefined, this.currentUser.id);
    }

    findAllCall
        .then((notifs) => {
          this.notifications = notifs;
          this.dataSource.data = this.notifications;
          this.dataSource = new MatTableDataSource<Notification>(this.notifications);
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
