export namespace PrintOutGridModel {
    export interface IGridToolbar {
        id: string;
        title: string;
        icon: string;
    }

    export interface IGridColumn {
        field: string;
        headerName: string;
        format?: 'date' | 'number' | 'currency';
        class?: string;
        renderAsCheckbox?: boolean;
        renderAsPills?: boolean;
        pillClass?: string;
    }

    export interface IGrid {
        id: string;
        column: IGridColumn[];
        dataSource: any[];
        height: string;
        showPaging: boolean;
        showFooter?: boolean;
        footerCol?: string[]
    }
}