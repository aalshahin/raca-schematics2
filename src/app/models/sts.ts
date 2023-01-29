import { BaseModel } from "@app/models/base-model";
import { StsService } from "@services/sts.service";
import { FactoryService } from "@services/factory.service";
import { LangService } from "@services/lang.service";
import { InterceptModel } from "@decorators/intercept-model";
import { StsInterceptor } from "@app/model-interceptors/sts-interceptor";
import { INames } from "@contracts/i-names";
import { searchFunctionType } from "@app/types/types";

const {receive, send} = new StsInterceptor()

@InterceptModel({receive, send})
export class Sts extends BaseModel<Sts, StsService> {
  service: StsService;
  langService!: LangService
  
  constructor() {
    super();
    this.service = FactoryService.getService('StsService')
    this.langService = FactoryService.getService('LangService');
  }

  getName(currentLang: string): string {
    return this[currentLang + 'Name' as keyof INames]
  }

  searchFields: { [key: string]: searchFunctionType | string } = {
  };

  buildForm(controls?: boolean): any {
  }
}