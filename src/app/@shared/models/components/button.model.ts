export namespace ButtonModel {
    export interface IButtonNavigation {
        id: string;
        icon: string;
        caption: string;
    }

    export interface ICustomButton {
        id: string;
        icon: string;
        caption: string;
        severity: 'primary' | 'danger' | 'success' | 'info' | 'secondary';
        class: string;
    }
}