import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormModel } from '../../models/components/custom-form.model';

@Component({
    selector: 'app-custom-form',
    templateUrl: './custom-form.component.html',
    styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit, AfterViewInit {

    CustomForms: FormGroup;
    CustomFormsProps!: CustomFormModel.IForm;

    @Input('props') set props(value: CustomFormModel.IForm) {
        this.CustomFormsProps = value;
    };

    get props(): CustomFormModel.IForm {
        return this.CustomFormsProps;
    };

    FormsLayoutClass = 'grid-rows-7 grid-flow-col';

    constructor(
        private _formBuilder: FormBuilder,
    ) {
        this.CustomForms = this._formBuilder.group({});
    }

    ngOnInit(): void {
        if (this.props.custom_class) {
            this.FormsLayoutClass = `${this.props.custom_class} grid-flow-col`
        } else {
            this.FormsLayoutClass = `grid-rows-${Math.floor(this.props.fields.length / 2) < 7 ? 7 : Math.floor(this.props.fields.length / 2)} grid-flow-col`
        }

        this.props.fields.forEach((item) => {
            if (item.type == 'numeric') {
                this.CustomForms.addControl(item.id, new FormControl(0, [Validators.required]));

                if (item.form_grouped_props) {
                    this.CustomForms.addControl(item.form_grouped_props.id, new FormControl(0, [Validators.required]));
                }
            };

            if (item.type == 'date') {
                this.CustomForms.addControl(item.id, new FormControl(new Date, [Validators.required]));
            };

            if (item.type != 'numeric' && item.type != 'date') {
                this.CustomForms.addControl(item.id, new FormControl("", [Validators.required]));
            };

            if (item.is_form_grouped) {
                this.CustomForms.addControl(item.form_grouped_props?.id!, new FormControl(0, []))
            };
        });
    }

    ngAfterViewInit(): void {
    }

    handleSetFormDefaultValue(): void {
        for (let item in this.props.default_value) {
            this.CustomForms.get(item)?.setValue(this.props.default_value[item]);
        }
    }

    handleSelectDataLookup(props: CustomFormModel.IFields, args: any): void {
        const selectedValue = props.lookup_props?.selectedValue as any;

        if (props.id == props.lookup_props?.selectedValue) {
            this.CustomForms.get(selectedValue)?.setValue(args[selectedValue]);
        } else {
            this.CustomForms.get(props.id)?.setValue(args[selectedValue]);
        };

        if (props.lookup_set_value_field?.length) {
            props.lookup_set_value_field?.forEach((item) => {
                this.CustomForms.get(item)?.setValue(args[item]);
            });
        };

        props.lookup_props?.callback?.(args);
    }

    handleChangeNumeric(props: CustomFormModel.IFields, args: any): void {
        const parser = `${args.target.value}`.replace(/\$\s?|(,*)/g, '');
        props.numeric_callback?.(parseInt(parser));
    }

    handleChangeDropdown(props: CustomFormModel.IFields, args: any): void {
        const selected = props.select_props?.filter((item) => {
            if (item.value == args.value) {
                return item;
            }
        });

        const data = selected!.length > 1 ? selected![0] : (selected!.length < 1 ? [] : selected![0]);

        props.select_callback?.(data);
    }

    handleSetFieldValue(id: string, value: any): void {
        this.CustomForms.get(id)?.setValue(value);
    }

    handleGetFieldValue(id: string): any {
        return this.CustomForms.get(id)?.value;
    }

    handleResetForm(): void {
        this.CustomForms.reset();

        this.props.fields.forEach((item) => {
            this.CustomForms.get(item.id)?.setValue('');
        });
    }

    handleSubmitForm(): any {
        return this.CustomForms.value;
    }
}
