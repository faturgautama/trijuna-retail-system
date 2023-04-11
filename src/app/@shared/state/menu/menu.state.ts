import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MenuItem } from "primeng/api";
import { MenuService } from "src/app/@core/service/components/menu/menu.service";
import { MenuAction } from "./menu.action";
import { tap } from "rxjs";

export interface MenuStateModel {
    entities: MenuItem[] | [];
}

@State<MenuStateModel>({
    name: 'menus',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class MenuState {

    constructor(
        private _menuService: MenuService
    ) { }

    @Selector()
    static allMenu(state: MenuStateModel) {
        return state.entities;
    }

    @Action(MenuAction.GetMainMenu)
    getMainMenu(ctx: StateContext<MenuStateModel>) {
        return this._menuService.getMainMenu()
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }

    @Action(MenuAction.SetNavbarMenu)
    setNavbarMenu(ctx: StateContext<MenuStateModel>, action: MenuItem[]) {
        return this._menuService.setNavbarMenu(action)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    const data = JSON.stringify(result.payload.data);

                    localStorage.setItem('SetNavbarMenu', data);

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }

    @Action(MenuAction.GetNavbarMenu)
    getNavbarMenu(ctx: StateContext<MenuStateModel>) {
        return this._menuService.getNavbarMenu()
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }
}