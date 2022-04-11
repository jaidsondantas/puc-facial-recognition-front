import { STATUS_OFFICES } from '../constants/status-office';
import { Pipe, PipeTransform } from '@angular/core';
import { MATERIAL_OPTIONS } from '../constants/marital-state';

@Pipe({
  name: 'statusOffice',
})
export class StatusOfficePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return STATUS_OFFICES.filter((m) => m.value === value)[0]?.label;
  }
}
