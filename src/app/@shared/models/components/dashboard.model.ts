import { ButtonModel } from "./button.model";

export namespace DashboardModel {
    export interface IDashboard {
        title: string;
        button_navigation: ButtonModel.IButtonNavigation[];
    }
}