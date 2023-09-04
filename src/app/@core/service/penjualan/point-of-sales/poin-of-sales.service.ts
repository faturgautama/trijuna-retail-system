import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PoinOfSalesService {

    Order$ = new BehaviorSubject<any[]>([]);

    constructor() { }

    onSaveOrder(data: any): void {
        this.Order$.next(data);
    }
}
