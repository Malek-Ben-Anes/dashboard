import * as _ from 'lodash';
import {Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SubjectService} from '@app/services/subject.service';
import {Subject} from '@app/models/Subject';
import {Level} from '@app/models/enums/Level';
import {TranslateService} from '@ngx-translate/core';
import {DialogContentExampleDialogComponent} from '@app/commons/dialog-content-example-dialog/dialog-content-example-dialog.component';
import {MatDialog} from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss'],
})
export class SubjectFormComponent implements OnInit, OnChanges {
  subjects: Subject[] = [];

  @Input('level')
  level: Level;

  @Input('subjectToSave')
  subjectToSave: Subject;

  @Output()
  refershEvent = new EventEmitter<string>();

  isNew: boolean;

  subjectForm: FormGroup;

  levels = Object.keys(Level);

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private subjectService: SubjectService,
    private translate: TranslateService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
    if (_.isNil(this.subjectToSave)) {
      this.isNew = true;
      this.subjectToSave = new Subject();
    } else {
      this.isNew = false;
      this.updateForm(this.subjectToSave);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!_.isNil(changes.level)) {
      this.level = changes.level.currentValue;
      this.createNewSubject();
    }
    if (!_.isNil(changes.subjectToSave)) {
      this.subjectToSave = changes.subjectToSave.currentValue;
      this.isNew = false;
    }

    if (!_.isNil(this.subjectForm)) {
      this.updateForm(this.subjectToSave);
    }
  }

  public onCreateNewSubject() {
    this.initForm();
    this.createNewSubject();
    // this.updateForm(this.subjectToSave);
  }

  onSubmit() {
    this.getSubmitedData();
    try {
      if (this.subjectToSave.id == null) {
        this.save(this.subjectToSave);
        this.toastr.success('OK', 'Création avec succès du groupe!');
      } else {
        this.update(this.subjectToSave);
        this.toastr.success('OK', 'Mise à jour avec succès du groupe!');
      }
    } catch {
      this.toastr.error('KO', 'Echec creation ou mise à jour du groupe');
    }
  }

  onConfirmationDelete() {
    this.subjectService
        .delete(this.subjectToSave.id)
        .subscribe((subject) => {
          this.onCreateNewSubject();
          this.refershEvent.emit(null);
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

  private createNewSubject() {
    this.isNew = true;
    this.subjectToSave = new Subject();
  }

  private initForm() {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      coefficient: ['', Validators.required],
      hourlyVolume: ['', Validators.required],
      sessionNumber: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private updateForm(subject: Subject): void {
    this.subjectForm.patchValue({
      name: subject.name,
      coefficient: subject.coefficient,
      hourlyVolume: subject.hourlyVolume,
      sessionNumber: subject.sessionNumber,
      description: subject.description,
    });
  }

  private save(subject: Subject) {
    this.subjectService.save(subject)
        .subscribe((subject) => {
          this.subjectToSave = subject;
          this.isNew = false;
          this.refershEvent.emit(null);
          console.log('Subject created');
        },
        (err) => console.log(err.error));
  }

  private update(subject: Subject) {
    this.subjectService.update(subject)
        .subscribe((subject) => {
          this.subjectToSave = subject;
          this.refershEvent.emit(null);
          console.log('subject updated');
        },
        (err) => console.log(err.error));
  }

  private getSubmitedData(): void {
    this.subjectToSave.name = this.extractFieldData('name');
    this.subjectToSave.coefficient = this.extractFieldData('coefficient');
    this.subjectToSave.hourlyVolume = this.extractFieldData('hourlyVolume');
    this.subjectToSave.sessionNumber = this.extractFieldData('sessionNumber');
    this.subjectToSave.description = this.extractFieldData('description');
    this.subjectToSave.level = this.level;
  }

  private extractFieldData(property: string): any {
    return this.subjectForm.get(property).value;
  }
}
