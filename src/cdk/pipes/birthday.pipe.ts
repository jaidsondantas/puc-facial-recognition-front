import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcYear',
})
export class CalcYearPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): any {
    const date = new Date(value);
    const dateNow = new Date();

    return dateNow.getFullYear() - date.getFullYear();
  }
}
