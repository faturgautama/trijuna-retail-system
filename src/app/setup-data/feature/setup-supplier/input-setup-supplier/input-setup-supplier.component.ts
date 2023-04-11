import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';

@Component({
    selector: 'app-input-setup-supplier',
    templateUrl: './input-setup-supplier.component.html',
    styleUrls: ['./input-setup-supplier.component.scss']
})
export class InputSetupSupplierComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInput: CustomFormModel.IForm;

    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
    ) {
        this.FormInput = {
            id: 'input_setup_supplier',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'nama_supplier',
                    label: 'Nama Supplier',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'alamat',
                    label: 'Alamat',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'kota',
                    label: 'Kota',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'kecamatan',
                    label: 'Kecamatan',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'kelurahan',
                    label: 'Kelurahan',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'email',
                    label: 'Email',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'no_handphone',
                    label: 'No. Handphone',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'is_pkp',
                    label: 'Apakah PKP',
                    status: 'insert',
                    type: 'radio',
                    radio_props: [
                        { id: 'pkp_true', name: 'Iya', value: true },
                        { id: 'pkp_false', name: 'Tidak', value: false },
                    ],
                    required: true,
                },
                {
                    id: 'is_tanpa_po',
                    label: 'Apakah Tanpa PO',
                    status: 'insert',
                    type: 'radio',
                    radio_props: [
                        { id: 'tanpa_po_true', name: 'Iya', value: true },
                        { id: 'tanpa_po_false', name: 'Tidak', value: false },
                    ],
                    required: true,
                },
                {
                    id: 'limit_hutang',
                    label: 'Limit Hutang',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'insert',
                    type: 'string',
                    required: false,
                },
            ]
        };

        this.DashboardProps = {
            title: 'Input Setup Supplier',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };
    }

    ngOnInit(): void {
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['setup-data/setup-supplier/list']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    handleSubmitForm(): void {
        const data = this.CustomForm.handleSubmitForm();

        this._store.dispatch(new SetupSupplierAction.Save(data))
            .subscribe((result) => {
                if (result.setup_supplier.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();
                }
            });
    }
}
