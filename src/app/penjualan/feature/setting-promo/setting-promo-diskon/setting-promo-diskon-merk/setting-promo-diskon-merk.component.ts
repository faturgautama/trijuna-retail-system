import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SettingPromoDiskonMerkService } from 'src/app/@core/service/penjualan/setting-promo/setitng-promo-diskon/setting-promo-diskon-merk.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupMerkAction } from 'src/app/@shared/state/setup-data/setup-merk';

@Component({
    selector: 'app-setting-promo-diskon-merk',
    templateUrl: './setting-promo-diskon-merk.component.html',
    styleUrls: ['./setting-promo-diskon-merk.component.scss']
})
export class SettingPromoDiskonMerkComponent implements OnInit {

    @Input('id_promo_diskon') id_promo_diskon: any;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    SelectedData: any;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _settingPromoDiskonMerkService: SettingPromoDiskonMerkService,
    ) {
        this.GridProps = {
            column: [
                { field: 'merk', headerName: 'MERK', flex: 200, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: 'calc(100vh - 22rem)',
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.FormDialogProps = {
            title: 'Setting Promo Diskon Merk',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_satuan',
                is_inline: true,
                fields: [
                    {
                        id: 'id_merk',
                        label: 'Merk',
                        status: 'insert',
                        type: 'select',
                        select_props: [],
                        required: false,
                    },
                ],
                custom_class: 'grid-rows-1'
            }
        }
    }

    ngOnInit(): void {
        // ** Merk
        const indexMerk = this.FormDialogProps.form_props.fields.findIndex((item) => { return item.id == 'id_merk' });

        this._store.dispatch(new SetupMerkAction.GetAll())
            .subscribe((result) => {
                if (result.setup_merk.entities.success) {
                    this.FormDialogProps.form_props.fields[indexMerk].select_props = result.setup_merk.entities.data.map((item: any) => {
                        return { name: item.merk, value: item.id_merk }
                    });
                }
            })
    }

    getDetailPromoDiskonMerk(): void {
        this._settingPromoDiskonMerkService
            .getAll(this.id_promo_diskon)
            .subscribe((result) => {
                this.GridProps.dataSource = result.data;
            })

    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleToolbarClicked(args: GridModel.IGridToolbar): void {
        switch (args.id) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            case 'delete':
                this._settingPromoDiskonMerkService
                    .delete(this.SelectedData.id_promo_diskon_setting_merk)
                    .subscribe((result) => {
                        if (result.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                            setTimeout(() => {
                                this.getDetailPromoDiskonMerk();
                            }, 1500);
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleSubmitForm(args: any): void {
        const payload = {
            id_promo_diskon: this.id_promo_diskon,
            id_merk: args.id_merk,
        };

        this._settingPromoDiskonMerkService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.FormDialog.onCloseFormDialog();
                    this.getDetailPromoDiskonMerk();
                }
            })
    }

}
