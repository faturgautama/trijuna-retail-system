import { LookupModel } from "./lookup.model";

export namespace CustomFormModel {
    export interface IForm {
        id: string;
        default_value?: any;
        type?: 'save' | 'update';
        fields: IFields[];
        is_inline?: boolean;
        custom_class?: string;
    }

    export interface IFormSelectProps {
        name: any;
        value: any;
    }

    export interface IFormCheckboxRadioProps {
        id: string;
        name: string;
        value: any;
    }

    export interface IFields {
        id: string;
        label: string;
        type: 'date' | 'datetime' | 'select' | 'checkbox' | 'radio' | 'string' | 'numeric' | 'lookup' | 'multi_select' | 'password';
        status: 'readonly' | 'insert';
        required: boolean;
        validator?: string;
        text_keyup_enter?: (data: any) => void;
        numeric_max_number?: number;
        numeric_step_number?: number;
        numeric_mode?: 'currency' | 'decimal';
        numeric_callback?: (data: any) => void;
        numeric_keyup_enter?: (data: any) => void;
        select_props?: IFormSelectProps[] | any[];
        select_callback?: (data: any) => void;
        checkbox_props?: IFormCheckboxRadioProps[];
        checkbox_callback?: (data: any) => void;
        radio_props?: IFormCheckboxRadioProps[];
        radio_callback?: (data: any) => void;
        radio_initial_value?: any;
        lookup_props?: LookupModel.ILookup;
        lookup_set_value_field?: any[]; // id_field yg lain yg mau di set value nya
        hidden?: boolean;
        is_form_grouped?: boolean;
        prefix?: string;
        prefix_position?: 'left' | 'right';
        form_grouped_props?: IFields;
        value?: any;
    }
}