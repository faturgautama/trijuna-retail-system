import { ColDef } from "ag-grid-community";

export namespace GridModel {
    export interface IGridToolbar {
        id: string;
        title: string;
        icon: string;
        data?: any;
    }

    export interface IGrid {
        column: ColDef[];
        dataSource: any[];
        height: string;
        showPaging: boolean;
        /**
         * Isi dengan value Add / Delete / Edit / Detail 
        */
        toolbar?: string[];
    }

    export interface IPrimeGridColumn {
        field: string;
        header: string;
        width: number;
        resizable?: boolean;
        sortable?: boolean;
        hide?: boolean;
        editable?: boolean;
        cellRenderer?: (data: any) => void;
    }

    export interface IPrimeGrid {
        column: IPrimeGridColumn[];
        dataSource: any[];
        height: string;
        showPaging: boolean;
        /**
         * Isi dengan value Add / Delete / Edit / Detail 
        */
        toolbar?: string;
    }
}