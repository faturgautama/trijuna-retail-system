export namespace FilterModel {
    export interface IOffcanvasFilterDatasource {
        id: string;
        title: string;
        type: 'string' | 'date' | any;
        value: string;
    }

    export interface IOffcanvasSavedFilter {
        id: string;
        title: string;
        type: 'like' | 'between';
        columnName: string;
        kataKunci: string;
        kataKunci2?: string;
    }

    export interface IOffcanvasFilter {
        filter: IOffcanvasFilterDatasource[];
        url?: string;
    }

    export interface IDynamicFilter {
        filter: 'contain' | 'between' | 'equel';
        column: string;
        value: string;
        value2?: string;
    }
}