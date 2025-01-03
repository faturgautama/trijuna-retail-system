import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormModel } from '../../models/components/custom-form.model';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';

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
        private _utilityService: UtilityService,
    ) {
        this.CustomForms = this._formBuilder.group({});
    }

    ngOnInit(): void {
        if (this.props.custom_class) {
            const if_form_faktur_pajak_retur = this.props.id == 'form_faktur_pajak_retur';
            this.FormsLayoutClass = `${this.props.custom_class} ${if_form_faktur_pajak_retur ? '' : 'grid-flow-col'}`
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

            if (item.type == 'date' || item.type == 'datetime') {
                this.CustomForms.addControl(item.id, new FormControl(null, [Validators.required]));
            };

            if (item.type == 'radio') {
                this.CustomForms.addControl(item.id, new FormControl(item.radio_initial_value ? item.radio_initial_value : null, [Validators.required]));
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

    handleSetFormClass(newClass: string) {
        this.FormsLayoutClass = newClass;
    }

    handleSetFormDefaultValue(): void {
        for (let item in this.props.default_value) {
            this.CustomForms.get(item)?.setValue(this.props.default_value[item]);
        }
    }

    handleChangeCalendar(props: CustomFormModel.IFields, args: any): void {
        if (args && props.type == 'date') {
            const formatedDate = this._utilityService.FormatDate(new Date(this.CustomForms.get(props.id)?.value), 'yyyy-MM-DD');
            this.CustomForms.get(props.id)?.setValue(formatedDate);
        }

        if (args && props.type == 'datetime') {
            const formatedDate = this._utilityService.FormatDate(new Date(this.CustomForms.get(props.id)?.value), 'yyyy-MM-DD HH:mm:ss');
            this.CustomForms.get(props.id)?.setValue(formatedDate);
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
        if (args.target.value) {
            const parser = `${args.target.value}`.replace(/\$\s?|(,*)/g, '');
            this.CustomForms.get(props.id)?.setValue(parseFloat(parser));
            props.numeric_callback?.(parseFloat(parser));
        } else {
            this.CustomForms.get(props.id)?.setValue(0);
            props.numeric_callback?.(0);
        }
    }

    handleEnterNumeric(props: CustomFormModel.IFields, args: any) {
        const parser = args.target.value ? `${args.target.value}`.replace(/\$\s?|(,*)/g, '') : "0";
        props.numeric_keyup_enter?.(parseFloat(parser));
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

    handleKeyupEnterText(args: any, props: CustomFormModel.IFields): any {
        return props.text_keyup_enter?.(args.target.value);
    }

    handleChangeRadioButton(props: CustomFormModel.IFields, args: any): void {
        props.radio_callback?.(args);
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
