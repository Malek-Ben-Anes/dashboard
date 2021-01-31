import {Injectable} from '@angular/core';
import {DialogService} from '@app/commons/dialog/dialog.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessageFactory {
  constructor(private dialogService: DialogService,
    private translate: TranslateService) {}

  public createMessage(message: string) {
    this.dialogService.openDialog({
      dialogTitle: this.translate.instant(message),
      dialogMessage: '',
    });
  }
}
