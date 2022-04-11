import { STATUS_OFFICES } from '../constants/status-office';
import { Pipe, PipeTransform } from '@angular/core';
import { MATERIAL_OPTIONS } from '../constants/marital-state';

@Pipe({
  name: 'firstWord',
})
export class FirstWordPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    const firstName = value.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }
}
