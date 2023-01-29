import { DialogService } from './dialog.service';
import { UrlService } from "@services/url.service";
import { FactoryService } from "@services/factory.service";
import { CastResponseContainer } from '@app/decorators/decorators/cast-response';
import { Pagination } from '@app/models/pagination';
import { StsPopupComponent } from "@app/administration/popups/sts-popup.component";

@CastResponseContainer({
  $default: {
    model: () => Sts
  },
  $pagination: {
    model: () => Pagination,
    shape: { 'rs.*': () => Sts }
  }
})

@Injectable({
  providedIn: 'root'
})

export class StsService extends CrudWithDialogGenericService<Sts> {
  constructor(
    public http: HttpClient,
    public urlService: UrlService,
    public dialog: DialogService
  ) {
    super();
    FactoryService.registerService('StsService', this)
  }

  _getDialogComponent(): ComponentType<any> {
    return StsComponent
  }

  _getModel(): new () => Sts {
    return Sts
  }

  _getServiceURL(): string {
    return this.urlService.URLS.STS
  }
}
