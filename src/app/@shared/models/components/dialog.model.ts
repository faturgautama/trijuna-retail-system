import { CustomFormModel } from './custom-form.model';

export namespace DialogModel {
    export interface IFormDialog {
        title: string;
        type: 'add' | 'edit';
        form_props: CustomFormModel.IForm;
    }
}