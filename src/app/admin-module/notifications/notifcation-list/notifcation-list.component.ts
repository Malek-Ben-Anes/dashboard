import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Notification } from 'app/models/Notification';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-notifcation-list',
  templateUrl: './notifcation-list.component.html',
  styleUrls: ['./notifcation-list.component.scss']
})
export class NotifcationListComponent implements OnInit {

  @Input('notifications') notifications: Notification[];

  @Input('newNotifications') newNotifications: number;

  ngOnInit() {}
}
