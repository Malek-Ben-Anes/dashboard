import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'app/models/DialogData';
import { TokenStorageService } from 'app/services/auth/token-storage.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  isRtl: string = 'ltr';
  title = 'Angular-Interceptor';

  constructor(private storage: TokenStorageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.isRtl = this.storage.isRtl() ? 'rtl' : 'ltr';
  }

}
