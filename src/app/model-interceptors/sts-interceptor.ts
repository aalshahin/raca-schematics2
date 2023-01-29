import {IModelInterceptor} from "@contracts/i-model-interceptor";
import {Sts} from "@app/models/sts";

export class StsInterceptor implements IModelInterceptor<Sts> {
  send(model: Partial<Sts>): Partial<Sts> {
    delete model.service;
    delete model.searchFields;
    delete model.langService;
    return model
  }
  
  receive(model: Sts): Sts {
    return model
  }
}