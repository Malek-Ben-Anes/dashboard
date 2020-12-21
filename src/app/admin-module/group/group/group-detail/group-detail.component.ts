import {Component, OnInit, OnDestroy} from '@angular/core';
import {Group} from '@app/models/Group.model';
import {BASE_URL} from '@app/app.component';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Level} from '@app/models/enums/Level';
import {GroupService} from '@app/services/http/group.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {DialogContentExampleDialogComponent} from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import {MatDialog} from '@angular/material';
import {SubsGroupService} from '@app/services/subs/subs-group.service';
import {Subscription} from 'rxjs';
import {CreateGroupRequest} from '@app/models/requests/group/CreateGroup.model';
import {UpdateGroupRequest} from '@app/models/requests/group/UpdateGroup.model';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  readonly BASE_URL: string = BASE_URL;

  currentGroup: Group;
  _subscription: Subscription;

  levels = Object.keys(Level);
  groupForm: FormGroup;
  isNew: boolean = true;

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private subsGroupService: SubsGroupService,
              public dialog: MatDialog, private router: Router, private translate: TranslateService) { }

  ngOnInit() {
    this.groupForm = this.initGroupForm();
    this._subscription = this.subsGroupService.getGroup().subscribe((group) => {
      this.currentGroup = group;
      this.isNew = false;
      this.updateForm();
    }, (err) => {
      this.currentGroup = new Group();
      this.isNew = true;
      this.updateForm();
    });
  }

  private initGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      description: [''],
    });
  }

  private updateForm(): void {
    this.groupForm.patchValue({
      name: this.currentGroup.name,
      description: this.currentGroup.description,
    });
    const groupLevel = this.levels.find((level) => level === this.currentGroup.level);
    this.groupForm.get('level').setValue(groupLevel);
  }

  onUpdate(): void {
    this.subsGroupService.updateGroup(<UpdateGroupRequest> this.prepareRequest()).subscribe((group) => {
      this.currentGroup = group; this.updateForm();
    }, (err) => console.log(err));
  }

  onCreate(): void {
    this.subsGroupService.createGroup(<CreateGroupRequest> this.prepareRequest()).subscribe((group) => {
      this.currentGroup = group;
      this.updateForm();
    }, (err) => console.log(err));
  }

  private prepareRequest(): UpdateGroupRequest|CreateGroupRequest {
    const request: UpdateGroupRequest = new UpdateGroupRequest();
    request.name = this.extractDataFromField('name');
    request.level = this.extractDataFromField('level');
    request.description = this.extractDataFromField('description');
    if (this.isNew) {
      return <CreateGroupRequest> request;
    }
    request.id = this.currentGroup.id;
    return request;
  }

  private extractDataFromField(property: string): any {
    return this.groupForm.get(property).value;
  }

  onConfirmationDelete() {
    this.groupService
        .deleteById(this.currentGroup.id)
        .then((group) => {
          console.log('delete group!');
          this.router.navigate(['app', 'groups']);
        });
  }

  onDelete(): void {
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
    dialogRef.afterClosed().subscribe((confirmtion) => {
      if (confirmtion) {
        this.onConfirmationDelete();
      }
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
