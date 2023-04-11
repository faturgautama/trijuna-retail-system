import { ColDef } from "ag-grid-community";

export namespace GridModel {
    export interface IGrid {
        column: ColDef[];
        dataSource: any[];
        height: string;
    }
}