import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { MenuAction } from 'src/app/@shared/state/menu';

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss']
})
export class BerandaComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    MainMenu: MenuItem[] = [];

    constructor(
        private _store: Store
    ) {
        this.DashboardProps = {
            title: 'Beranda',
            button_navigation: [],
        };
    }

    ngOnInit(): void {
        this.getMainMenu();
    }

    getMainMenu(): void {
        this._store.dispatch(new MenuAction.GetMainMenu())
            .subscribe((result) => {
                this.MainMenu = result.menus.entities;
            })
    }

    handleClickMainMenu(data: MenuItem): void {
        this._store.dispatch(new MenuAction.SetNavbarMenu({ data: data.items as MenuItem[] }, "SET MENU NAVBAR"))
            .subscribe((result) => {
                // console.log(result);
            })
    }
}
