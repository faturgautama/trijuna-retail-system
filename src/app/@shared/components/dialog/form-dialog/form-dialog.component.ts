import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { CustomFormComponent } from '../../custom-form/custom-form.component';

@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

    FormDialogProps!: DialogModel.IFormDialog;

    @Input('props') set props(value: DialogModel.IFormDialog) {
        this.FormDialogProps = value;
    };

    get props(): DialogModel.IFormDialog {
        return this.FormDialogProps;
    }

    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;
    FormProps!: CustomFormModel.IForm;

    ShowDialog: boolean = false;

    @Output('onCloseDialog') onCloseDialog = new EventEmitter<any>();

    @Output('onSubmitForm') onSubmitForm = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
        this.FormProps = this.props.form_props;
    }

    onOpenFormDialog(): void {
        this.ShowDialog = true;

        this.FormProps = this.props.form_props;

        if (this.props.type == 'add') {
            this.CustomForm.handleResetForm();
        }

        if (this.props.type == 'edit') {
            this.CustomForm.handleSetFormDefaultValue();
        }
    }

    onCloseFormDialog(): void {
        this.ShowDialog = false;
    }

    handleSubmitForm(): void {
        const data = this.CustomForm.handleSubmitForm();
        this.onSubmitForm.emit(data);
    }

    handleCloseDialog(): void {
        this.ShowDialog = false;
        this.onCloseDialog.emit('closed');
    }
}
