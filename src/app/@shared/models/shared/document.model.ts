export namespace DocumentModel {
    export interface IExportExcelColumn {
        header: string;
        key: string;
        width: number;
    }

    export interface ExportExcel {
        worksheetName: string;
        dataSource: any[];
    }

    export interface ExportCsv {
        worksheetName: string;
        dataSource: any[];
    }
}