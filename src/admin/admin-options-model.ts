import {strings} from "@angular-devkit/core";
import {AdminOptions} from "./Admin-options";

export class adminOptionsModel implements AdminOptions {
    fileName: string;
    name: string;
    servicePath: string;
    modelPath: string;
    interceptorPath: string;
    enumName: string;
    urlName: string;
    endPoint: string;
    menuKey: string;
    routeName: string;
    componentPath: string;
    componentPopupPath: string;
    
    constructor(options: AdminOptions) {
        this.endPoint = options.endPoint
        this.init(options.name)
    }

    private init(name: string): void {
        this.name = strings.classify(name)
        this.fileName = this.routeName = strings.dasherize(this.name)
        this.servicePath = '@services/' + this.fileName + '.service';
        this.modelPath = '@models/' + this.fileName;
        this.interceptorPath = '@model-interceptors/' + this.fileName + '-interceptor'
        this.enumName = this.urlName = strings.underscore(this.name).toUpperCase()
        this.menuKey = 'menu_' + strings.underscore(name).toLowerCase()
        this.componentPath = `./pages/${strings.dasherize(this.name)}/${strings.dasherize(this.name)}.component`
        this.componentPopupPath = `./popups/${strings.dasherize(this.name)}-popup/${strings.dasherize(this.name)}-popup.component`
    }

}
