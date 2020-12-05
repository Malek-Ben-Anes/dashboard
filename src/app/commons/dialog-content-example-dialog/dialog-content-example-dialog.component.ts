import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '@app/models/DialogData';
import { TokenStorageService } from '@app/services/auth/token-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.scss']
})
export class DialogContentExampleDialogComponent implements OnInit {

  isRtl: string = 'ltr';

  // https://blog.thoughtram.io/angular/2017/11/13/easy-dialogs-with-angular-material.html
  constructor(private storage: TokenStorageService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  ngOnInit() {
    this.isRtl = this.storage.isRtl() ? 'rtl' : 'ltr';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

