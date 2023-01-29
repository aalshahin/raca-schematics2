import { apply, applyTemplates, chain, move, Rule, strings, url } from '@angular-devkit/schematics';
import { mergeWith } from '@angular-devkit/schematics'
import { updateAppUrls } from '../app/updateAppUrls';
import { updateLanguage } from '../app/updateLanguage';
import { updateAdminMenuItemAndRoutingModule } from '../app/updateAdminMenuItemAndRoutingModule';
import { AdminOptions } from './admin-options';
import { adminOptionsModel } from './admin-options-model';
import { updatePermissionEnum } from '../app/updatePermissionEnum';


export function admin(_options: AdminOptions): Rule {
  const options = new adminOptionsModel( _options )
  
  const templateSource = apply(url('./files'), [
    applyTemplates({
        ...options,
        ...strings
    }),
    move('.')
  ])
 
  
  return chain([
    mergeWith(templateSource),
    updateLanguage(options.menuKey),
    updateAdminMenuItemAndRoutingModule(options),
    updateAppUrls(options.urlName),
    updatePermissionEnum(options.enumName)
  ])
}
