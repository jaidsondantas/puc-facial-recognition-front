import { STATUS_OFFICES } from '../constants/status-office';
import { Pipe, PipeTransform } from '@angular/core';
import { MATERIAL_OPTIONS } from '../constants/marital-state';
import { Module } from '@fuse/models/module.model';
import { RoleModule } from '@fuse/models/role-module.model';

@Pipe({
  name: 'modulesString',
})
export class ModulesStringPipe implements PipeTransform {
  transform(value: RoleModule[], ...args: any[]): string {
    let module = '';
    value.forEach((m, i) => {
      if (i + 1 < value.length) {
        module += `${m.module.name}, `;
      } else {
        module += `${m.module.name}`;
      }
    });

    return module;
  }
}
