import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { LoginModel } from 'src/app/@shared/models/authentication/authentication.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { MenuAction } from 'src/app/@shared/state/menu';
import { PemesananPoAction } from 'src/app/@shared/state/pembelian/pemesanan-po';
import { PembelianDenganPoAction } from 'src/app/@shared/state/pembelian/pembelian-dengan-po';
import { PembelianTanpaPoAction } from 'src/app/@shared/state/pembelian/pembelian-tanpa-po';

@Component({
    selector: 'app-beranda',
    templateUrl: './beranda.component.html',
    styleUrls: ['./beranda.component.scss']
})
export class BerandaComponent implements OnInit {

    UserData: LoginModel.ILoginResponse;

    DashboardProps: DashboardModel.IDashboard;

    MainMenu: MenuItem[] = [];

    CountPemesananPo: number = 0;
    CountPembelianDenganPo: number = 0;
    CountPembelianTanpaPo: number = 0;

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
        this.getOtherData();
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

    getOtherData(): void {
        this._store.dispatch(new PemesananPoAction.GetCountStatusOpen())
            .subscribe((result) => {
                this.CountPemesananPo = result.pemesanan_po.entities;
            });

        this._store.dispatch(new PembelianDenganPoAction.GetCountStatusOpen())
            .subscribe((result) => {
                this.CountPembelianDenganPo = result.pembelian_dengan_po.entities;
            });

        this._store.dispatch(new PembelianTanpaPoAction.GetCountStatusOpen())
            .subscribe((result) => {
                this.CountPembelianTanpaPo = result.pembelian_tanpa_po.entities;
            });
    }
}
