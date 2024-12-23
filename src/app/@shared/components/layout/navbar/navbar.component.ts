import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginModel } from 'src/app/@shared/models/authentication/authentication.model';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { CookiesUtils } from 'src/app/@shared/utils/cookies.utils';
import { MenuAction } from 'src/app/@shared/state/menu';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    items: MenuItem[];

    userMenu: MenuItem[];

    UserData: LoginModel.ILoginResponse;

    MainMenu: MenuItem[] = [];

    @ViewChild('op') overlaypanel!: OverlayPanel;

    constructor(
        private _store: Store,
        private _router: Router,
        private _cookieUtils: CookiesUtils,
        private _messageService: MessageService,
        private _authenticationService: AuthenticationService,
    ) {
        this.UserData = this._authenticationService.userData;

        this.items = [
            {
                label: 'Beranda'
            }
        ];

        this._store
            .select(state => state.menus)
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

        this.userMenu = [
            {
                label: 'Sign Out',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.onSignOut();
                }
            }
        ];
    }

    ngOnInit(): void {
        this.getMainMenu();
    }

    private getMainMenu(): void {
        this._store.dispatch(new MenuAction.GetMainMenu())
            .subscribe((result) => {
                this.MainMenu = result.menus.entities;
            })
    }

    handleClickMainMenu(data: MenuItem): void {
        this.overlaypanel.hide();

        this._store
            .dispatch(new MenuAction.SetNavbarMenu({ data: data.items as MenuItem[] }, "SET MENU NAVBAR"))
            .subscribe((result) => {
                // console.log(result);
            })
    }

    onSignOut(): void {
        this._authenticationService.logout()
            .then((result) => {
                this._messageService.clear();
                this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Sign Out Berhasil' });

                setTimeout(() => {
                    this._cookieUtils.deleteCookie('TRSUserData');
                    this._router.navigate(['/']);
                }, 1000);
            })
    }
}
