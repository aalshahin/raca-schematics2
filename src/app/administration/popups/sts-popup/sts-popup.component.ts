import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AdminGenericDialog } from '@app/generics/admin-generic-dialog';
import { IDialogData } from '@app/interfaces/i-dialog-data';
import { Sts } from '@app/models/sts';
import { LangService } from '@app/services/lang.service';
import { LookupService } from '@app/services/lookup.service';
import { ToastService } from '@app/services/toast.service';
import { DialogRef } from '@app/shared/models/dialog-ref';
import { DIALOG_DATA_TOKEN } from '@app/shared/tokens/tokens';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'sts-popup',
  templateUrl: './sts-popup.component.html',
  styleUrls: ['./sts-popup.component.scss']
})
export class StsPopupComponent extends AdminGenericDialog<Sts> {
  form!: UntypedFormGroup;
  model!: Sts;
  
  constructor(public dialogRef: DialogRef,
              public fb: UntypedFormBuilder,
              public lang: LangService,
              private toast: ToastService,
              ) {
    super();
    this.model = data.model;
  }

  initPopup(): void {
  }

  buildForm(): void {
    this.form = this.fb.group(this.model.buildForm(true));
  }

  beforeSave(model: Sts, form: UntypedFormGroup): Observable<boolean> | boolean {
    return form.valid;
  }

  saveFail(error: Error): void {
  }

  destroyPopup(): void {
  }
}