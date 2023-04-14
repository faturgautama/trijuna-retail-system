import { ColDef } from "ag-grid-community";

export namespace GridModel {
    export interface IGridToolbar {
        id: string;
        title: string;
        icon: string;
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
}