import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'app/models/DialogData';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  title = 'Angular-Interceptor';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

}
