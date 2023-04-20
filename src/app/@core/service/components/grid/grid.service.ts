import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GridService {

    GridDatasource = new BehaviorSubject([]);

    constructor() { }
}
