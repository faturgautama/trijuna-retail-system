import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor() { }

    FormatDate(date: Date, format?: string): any {
        if (date) {
            return format ? moment(date).format(format) : moment(date).format('DD/MM/yyyy');
        } else {
            return date;
        }
    }

    FormatNumber(number: any, prefix?: string): any {
        if (number) {
            return prefix ? prefix + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            return number;
        }
    }

    IconBoolean(data: 0 | 1): any {
        if (data == 1) {
            return `<i class="pi pi-check"></i>`;
        } else {
            return `<i class="pi pi-times"></i>`;
        }
    }
}
