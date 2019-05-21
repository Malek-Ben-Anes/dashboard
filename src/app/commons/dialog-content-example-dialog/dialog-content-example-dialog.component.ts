import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'app/lesson-list/lesson-list.component';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.scss']
})
export class DialogContentExampleDialogComponent implements OnInit {

  // https://blog.thoughtram.io/angular/2017/11/13/easy-dialogs-with-angular-material.html

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  // constructor(public dialogRef: MdDialogRef<DialogContentExampleDialogComponent>) {}

  ngOnInit() {
  }

}
