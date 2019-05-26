import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.scss']
})
export class DialogContentExampleDialogComponent implements OnInit {

  // https://blog.thoughtram.io/angular/2017/11/13/easy-dialogs-with-angular-material.html
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  dialogTitle: string;
  dialogMessage: string;
}
