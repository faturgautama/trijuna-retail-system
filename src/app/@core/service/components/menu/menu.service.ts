import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { menu } from './data-menu';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    MENU = menu;

    NavbarMenu = new BehaviorSubject<MenuItem[]>([]);

    constructor() { }

    getMainMenu(): Observable<MenuItem[]> {
        return of(this.MENU);
    }

    setNavbarMenu(data: MenuItem[]): Observable<any> {
        this.NavbarMenu.next([]);
        this.NavbarMenu.next(data);
        return of(data);
    }

    getNavbarMenu(): Observable<MenuItem[]> {
        return this.NavbarMenu;
    }
}
