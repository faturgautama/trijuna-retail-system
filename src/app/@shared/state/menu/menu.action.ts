import { MenuItem } from "primeng/api";

export namespace MenuAction {
    export class GetMainMenu {
        static readonly type = '[MENU] Get Main Menu';
    }

    export class SetNavbarMenu {
        static readonly type = '[MENU] Set Navbar Menu';
        constructor(public payload: { data: MenuItem[] }, public type: string) { }
    }

    export class GetNavbarMenu {
        static readonly type = '[MENU] Get Navbar Menu';
    }
}