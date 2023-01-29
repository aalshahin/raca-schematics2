import {Rule, SchematicsException} from "@angular-devkit/schematics";
import {strings} from "@angular-devkit/core";
import {
    ArrayLiteralExpression,
    createSourceFile,
    isVariableDeclaration,
    ScriptTarget
} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

import {addDeclarationToModule, findNodes} from "@schematics/angular/utility/ast-utils";
import {applyToUpdateRecorder} from "@schematics/angular/utility/change";
import {AdminOptions} from "../admin/admin-options";
import { findNodeValue } from "./findNodeValue";
import { insertToArray } from "./insertToArray";

const createMenuItem = (name: string,
                        enumName: string,
                        options: {
                            id: number
                            langKey: string,
                        }) => {
    return `{
    id: ${options.id},
    langKey: '${options.langKey}',
    path: '/home/administration/${strings.dasherize(name)}',
    icon: 'mdi-badge-account-horizontal-outline',
    isSvg: false,
    permission: PermissionsEnum.${enumName},
    permissionGroup: null,
    parent: 6,
    group: 'administration',
    itemOrder: 25,
    svg: null
  }`
}

const createRoute = (name: string, enumName: string, routeName: string) => {
    return `{
    path: '${routeName}', component: ${strings.classify(name)}Component,
    canActivate: [PermissionGuard],
    data: {
      permissionKey: PermissionsEnum.${enumName},
      configPermissionGroup: null,
      checkAnyPermission: false
    }
  }`
}

export function updateAdminMenuItemAndRoutingModule(options: AdminOptions): Rule {
    const path = 'src/app/resources/navigation-menu-list.ts'
    
    const selectedOptions = {
        id: 30,
        langKey: options.menuKey,
        routing: 'src/app/administration/admin-routing.module.ts',
        module: 'src/app/administration/administration.module.ts'
    }
    return (host) => {
        const content = host.readText(path)
        const source = createSourceFile(path, content, ScriptTarget.Latest, true)
        const navigation = findNodeValue<ArrayLiteralExpression>(source, 'navigationMenuList')
        const routingContent = host.readText(selectedOptions.routing)
        const routingSource = createSourceFile(selectedOptions.routing, routingContent, ScriptTarget.Latest, true)
        const moduleContent = host.readText(selectedOptions.module)
        const moduleSource = createSourceFile(selectedOptions.module, moduleContent, ScriptTarget.Latest, true)
        if (!navigation) {
            throw new SchematicsException('there is no menu navigation list here')
        }

        selectedOptions.id = navigation.elements.length + 1

        const variables = findNodes(routingSource, isVariableDeclaration)
        const menuVariables = findNodes(source, isVariableDeclaration)

        if (!variables.length || !menuVariables.length) {
            throw new SchematicsException('there is no routes defined in this module')
        }

        const routingArray = variables[0].initializer as ArrayLiteralExpression;
        const menuArray = menuVariables[0].initializer as ArrayLiteralExpression;

        const change = insertToArray(routingArray, createRoute(options.name, options.enumName, options.routeName))
        const routeRecorder = host.beginUpdate(selectedOptions.routing)
        applyToUpdateRecorder(routeRecorder, [change])
        host.commitUpdate(routeRecorder)

        const menuChange = insertToArray(menuArray, createMenuItem(options.name, options.enumName, selectedOptions))
        const menuRecorder = host.beginUpdate(path)
        applyToUpdateRecorder(menuRecorder, [menuChange])
        host.commitUpdate(menuRecorder)

        const componentDeclarationChange = addDeclarationToModule(moduleSource, selectedOptions.module, (options.name + 'Component'), options.componentPath)
        const componentDeclarationRecorder = host.beginUpdate(selectedOptions.module)
        applyToUpdateRecorder(componentDeclarationRecorder, componentDeclarationChange)
        host.commitUpdate(componentDeclarationRecorder)


        const latestModuleContent = host.readText(selectedOptions.module)
        const latestModuleSource = createSourceFile(selectedOptions.module, latestModuleContent, ScriptTarget.Latest, true)

        const declareChange = addDeclarationToModule(latestModuleSource, selectedOptions.module, strings.classify(options.name), options.urlName)
        const declareRecorder = host.beginUpdate(selectedOptions.module)
        applyToUpdateRecorder(declareRecorder, declareChange)
        host.commitUpdate(declareRecorder)

        return host
    }
}
