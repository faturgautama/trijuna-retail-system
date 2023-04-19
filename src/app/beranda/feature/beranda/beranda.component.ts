import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { LoginModel } from 'src/app/@shared/models/authentication/authentication.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { AuthenticationService } from 'src/app/@shared/services/authentication/authentication.service';
import { MenuAction } from 'src/app/@shared/state/menu';

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss']
})
export class BerandaComponent implements OnInit {

    UserData: LoginModel.ILoginResponse;

    DashboardProps: DashboardModel.IDashboard;

    MainMenu: MenuItem[] = [];

    constructor(
        private _store: Store,
        private _authenticationService: AuthenticationService,
    ) {
        this.UserData = this._authenticationService.userData;

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
