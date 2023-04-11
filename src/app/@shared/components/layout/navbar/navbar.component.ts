import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { MenuAction } from 'src/app/@shared/state/menu';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    items: MenuItem[];

    constructor(
        private _store: Store
    ) {
        this.items = [
            {
                label: 'Beranda'
            }
        ];

        this._store.select(state => state.menus)
            .subscribe((result) => {
                if (result?.entities && result?.entities.type == 'SET MENU NAVBAR') {
                    this.items = result.entities.payload.data;
                } else {
                    const navbarMenu = localStorage.getItem('SetNavbarMenu');

                    if (navbarMenu) {
                        this.items = JSON.parse(navbarMenu);
                    }
                }
            });
    }

    ngOnInit(): void {
    }
}
