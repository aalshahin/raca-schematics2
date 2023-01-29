import { Component, ViewChild } from '@angular/core';
import { AdminGenericComponent } from '@app/generics/admin-generic-component';
import { Sts } from '@app/models/sts';
import { StsService } from '@app/services/sts.service';
import { DialogService } from '@app/services/dialog.service';
import { LangService } from '@app/services/lang.service';
import { SharedService } from '@app/services/shared.service';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'sts',
  templateUrl: './sts.component.html',
  styleUrls: ['./sts.component.scss']
})

export class StsComponent extends AdminGenericComponent<Sts, StsService>  {
  @ViewChild('table') table!: TableComponent;
  displayedColumns: string[] = [];

  constructor(public lang: LangService,
              public service: StsService,
              private dialogService: DialogService,
              private sharedService: SharedService,
              private toast: ToastService) {
    super();
  }

  afterReload(): void {
  }

  protected _init(): void {
  }
}