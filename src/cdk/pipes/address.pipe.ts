import {Pipe, PipeTransform} from '@angular/core';
import {Address} from '../models/address.model';

@Pipe({
    name: 'address'
})
export class AddressPipe implements PipeTransform {

    transform(value: Address[], ...args: unknown[]): string {
        if (value?.length) {
            const address = value[0];
            return `Quadra ${address?.address} Lote ${address?.number} ${address?.complement} ${address.district} ${address.city} ${address.state}`;
        }

        return '';
    }

}
