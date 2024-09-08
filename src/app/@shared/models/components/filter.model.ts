export namespace FilterModel {
    export interface IOffcanvasFilterDatasource {
        id: string;
        title: string;
        type: 'string' | 'date' | 'dropdown' | any;
        value: string;
        dropdown_props?: IOffcanvasFilterDropdown[]
    }

    export interface IOffcanvasFilterDropdown {
        name: string;
        value: string;
    }

    export interface IOffcanvasSavedFilter {
        id: string;
        title: string;
        type: 'like' | 'between' | 'equal';
        columnName: string;
        kataKunci: string;
        kataKunci2?: string;
        dropdownDatasource?: any[]
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