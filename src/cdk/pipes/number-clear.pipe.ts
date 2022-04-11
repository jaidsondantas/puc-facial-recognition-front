import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberClear'
})
export class NumberClearPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
      return  value.replace('(', '')
          .replace(')', '')
          .replace(' ', '')
          .replace('-', '')
  }

}
