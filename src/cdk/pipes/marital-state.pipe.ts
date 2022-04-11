import {Pipe, PipeTransform} from '@angular/core';
import {MATERIAL_OPTIONS} from '../constants/marital-state';

@Pipe({
    name: 'maritalState'
})
export class MaritalStatePipe implements PipeTransform {

    transform(value: string, ...args: any[]): string {
        return MATERIAL_OPTIONS.filter(m => m.value === value)[0]?.label;
    }

}
